import { useState, useRef } from 'react';
import { GENRES, Genre } from '@/data/games';
import Icon from '@/components/ui/icon';

const GAMES_API = 'https://functions.poehali.dev/da4e35c6-e266-424a-bfdd-40ab3f56dcad';

interface AddGameModalProps {
  onClose: () => void;
  onAdded: () => void;
}

const PLATFORMS_LIST = ['PC', 'PS4', 'PS5', 'Xbox', 'Switch', 'Mobile'];

export default function AddGameModal({ onClose, onAdded }: AddGameModalProps) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState<Genre | ''>('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [tags, setTags] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [coverBase64, setCoverBase64] = useState('');
  const [coverType, setCoverType] = useState('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverType(file.type);
    const reader = new FileReader();
    reader.onload = ev => {
      const result = ev.target?.result as string;
      setCoverPreview(result);
      // strip data:...;base64,
      setCoverBase64(result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !genre) {
      setError('Заполни название и жанр');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(GAMES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          genre,
          description: description.trim(),
          year: parseInt(year) || 2024,
          developer: developer.trim(),
          publisher: publisher.trim(),
          platforms,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          coverBase64,
          coverType,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Ошибка сервера');
      }
      onAdded();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Не удалось добавить игру');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-card rounded-2xl border border-border animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="font-oswald font-bold text-2xl gradient-text">Добавить игру</h2>
            <p className="text-muted-foreground text-xs font-rubik mt-0.5">Заполни информацию об игре</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Cover upload */}
          <div
            onClick={() => fileRef.current?.click()}
            className="relative h-44 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer overflow-hidden bg-secondary group"
          >
            {coverPreview ? (
              <>
                <img src={coverPreview} alt="обложка" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white font-rubik text-sm">Изменить обложку</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                <Icon name="ImagePlus" size={32} className="text-primary/50" />
                <p className="font-rubik text-sm">Загрузить обложку</p>
                <p className="font-rubik text-xs opacity-60">JPG, PNG до 5 МБ</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>

          {/* Title + Genre */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Название *</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Например, Cyberpunk 2077"
                className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 font-rubik"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Жанр *</label>
              <select
                value={genre}
                onChange={e => setGenre(e.target.value as Genre)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 cursor-pointer font-rubik"
              >
                <option value="">Выбери жанр</option>
                {GENRES.filter(g => g !== 'Все').map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Описание</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Краткое описание игры..."
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 resize-none font-rubik"
            />
          </div>

          {/* Developer + Publisher + Year */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Разработчик</label>
              <input
                value={developer}
                onChange={e => setDeveloper(e.target.value)}
                placeholder="CD Projekt Red"
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 font-rubik"
              />
            </div>
            <div>
              <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Издатель</label>
              <input
                value={publisher}
                onChange={e => setPublisher(e.target.value)}
                placeholder="CD Projekt"
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 font-rubik"
              />
            </div>
            <div>
              <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Год</label>
              <input
                type="number"
                value={year}
                onChange={e => setYear(e.target.value)}
                min={1980}
                max={2030}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 font-rubik"
              />
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-2">Платформы</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS_LIST.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-rubik border transition-all ${
                    platforms.includes(p)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary text-muted-foreground border-border hover:border-primary/40'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-oswald text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Теги</label>
            <input
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="RPG, открытый мир, кооп — через запятую"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 font-rubik"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm font-rubik bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-oswald font-semibold text-lg py-3 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_hsl(270_80%_60%/0.3)] hover:shadow-[0_0_30px_hsl(270_80%_60%/0.5)]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Icon name="Loader2" size={18} className="animate-spin" />
                Добавляю...
              </span>
            ) : (
              '+ Добавить игру в каталог'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}