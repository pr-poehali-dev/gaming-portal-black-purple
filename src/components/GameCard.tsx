import { useState } from 'react';
import { Game } from '@/data/games';
import Icon from '@/components/ui/icon';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  const [imgError, setImgError] = useState(false);

  const stars = Math.round(game.rating / 2);

  return (
    <div
      className="card-hover cursor-pointer rounded-xl overflow-hidden bg-card border border-border group animate-fade-in"
      onClick={() => onClick(game)}
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {!imgError ? (
          <img
            src={game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-purple-900/40 to-black">
            🎮
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-yellow-500/40 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-white font-oswald font-semibold text-sm">{game.rating}</span>
        </div>

        {/* Genre badge */}
        <div className="absolute top-3 left-3">
          <span className="genre-badge">{game.genre}</span>
        </div>

        {/* Bottom info on cover */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex flex-wrap gap-1">
            {game.platforms.slice(0, 3).map(p => (
              <span key={p} className="text-[10px] bg-white/10 backdrop-blur-sm border border-white/20 rounded px-1.5 py-0.5 text-white/80">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-oswald font-semibold text-lg text-white leading-tight mb-1 group-hover:text-neon-purple transition-colors line-clamp-1">
          {game.title}
        </h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed font-rubik">
          {game.description}
        </p>

        {/* Stars + votes */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < stars ? 'star-filled' : 'star-empty'}`}>★</span>
            ))}
          </div>
          <span className="text-muted-foreground text-xs font-rubik">
            {game.votes.toLocaleString('ru-RU')} оценок
          </span>
        </div>

        {/* Year + developer */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
          <span className="text-muted-foreground text-xs font-rubik">{game.developer}</span>
          <span className="text-muted-foreground text-xs font-rubik">{game.year}</span>
        </div>
      </div>
    </div>
  );
}
