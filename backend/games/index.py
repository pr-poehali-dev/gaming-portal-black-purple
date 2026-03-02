"""
API для каталога игр: получение списка, добавление новой игры с загрузкой обложки в S3.
"""

import json
import os
import base64
import uuid
import psycopg2
import boto3

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def get_db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def upload_cover(image_b64: str, content_type: str) -> str:
    ext = content_type.split('/')[-1] if '/' in content_type else 'jpg'
    key = f"games/covers/{uuid.uuid4()}.{ext}"
    data = base64.b64decode(image_b64)
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=key, Body=data, ContentType=content_type)
    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"
    return cdn_url


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')

    # GET — список игр
    if method == 'GET':
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, genre, description, cover_url, screenshots,
                   rating, votes, year, developer, publisher, platforms, tags
            FROM games
            ORDER BY rating DESC
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()

        games = []
        for r in rows:
            games.append({
                'id': r[0],
                'title': r[1],
                'genre': r[2],
                'description': r[3],
                'coverUrl': r[4] or '',
                'screenshots': list(r[5]) if r[5] else [],
                'rating': float(r[6]),
                'votes': r[7],
                'year': r[8],
                'developer': r[9] or '',
                'publisher': r[10] or '',
                'platforms': list(r[11]) if r[11] else [],
                'tags': list(r[12]) if r[12] else [],
            })

        return {
            'statusCode': 200,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'games': games}, ensure_ascii=False),
        }

    # POST — добавить игру
    if method == 'POST':
        body = json.loads(event.get('body') or '{}')

        title = body.get('title', '').strip()
        genre = body.get('genre', '').strip()
        description = body.get('description', '').strip()
        year = int(body.get('year') or 2024)
        developer = body.get('developer', '').strip()
        publisher = body.get('publisher', '').strip()
        platforms = body.get('platforms', [])
        tags = body.get('tags', [])
        cover_b64 = body.get('coverBase64', '')
        cover_type = body.get('coverType', 'image/jpeg')

        if not title or not genre:
            return {
                'statusCode': 400,
                'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Название и жанр обязательны'}, ensure_ascii=False),
            }

        cover_url = ''
        if cover_b64:
            cover_url = upload_cover(cover_b64, cover_type)

        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO games (title, genre, description, cover_url, rating, votes, year, developer, publisher, platforms, tags)
            VALUES (%s, %s, %s, %s, 0, 0, %s, %s, %s, %s, %s)
            RETURNING id
        """, (title, genre, description, cover_url, year, developer, publisher, platforms, tags))
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 201,
            'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps({'id': new_id, 'coverUrl': cover_url}, ensure_ascii=False),
        }

    return {
        'statusCode': 405,
        'headers': CORS_HEADERS,
        'body': json.dumps({'error': 'Method not allowed'}),
    }
