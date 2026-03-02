import { useState } from 'react';
import { Game, GENRE_ICONS } from '@/data/games';
import Icon from '@/components/ui/icon';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

export default function GameModal({ game, onClose }: GameModalProps) {
  const [activeScreen, setActiveScreen] = useState(0);
  const stars = Math.round(game.rating / 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-border text-white/70 hover:text-white hover:border-primary transition-colors"
        >
          <Icon name="X" size={16} />
        </button>

        {/* Hero image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={game.screenshots[activeScreen] || game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          {/* Genre */}
          <div className="absolute top-4 left-4">
            <span className="genre-badge text-sm px-3 py-1.5">
              {GENRE_ICONS[game.genre]} {game.genre}
            </span>
          </div>

          {/* Screenshots nav */}
          {game.screenshots.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {game.screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreen(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeScreen ? 'bg-primary w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-oswald font-bold text-3xl text-white mb-1">{game.title}</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-rubik">
                <span>{game.developer}</span>
                <span>·</span>
                <span>{game.year}</span>
                <span>·</span>
                <span>{game.publisher}</span>
              </div>
            </div>

            {/* Big rating */}
            <div className="flex-shrink-0 text-center bg-secondary rounded-xl p-3 border border-border">
              <div className="font-oswald font-bold text-3xl neon-text">{game.rating}</div>
              <div className="text-muted-foreground text-xs font-rubik mt-0.5">{game.votes.toLocaleString('ru-RU')} оценок</div>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-xl ${i < stars ? 'star-filled' : 'star-empty'}`}>★</span>
            ))}
            <span className="text-muted-foreground text-sm ml-2 font-rubik">{game.rating} / 10</span>
          </div>

          {/* Description */}
          <p className="text-foreground/80 text-sm leading-relaxed font-rubik mb-6">
            {game.description}
          </p>

          {/* Platforms */}
          <div className="mb-5">
            <h4 className="font-oswald font-semibold text-sm text-muted-foreground uppercase tracking-widest mb-2">Платформы</h4>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map(p => (
                <span key={p} className="text-sm bg-secondary border border-border rounded-lg px-3 py-1.5 text-foreground font-rubik">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-oswald font-semibold text-sm text-muted-foreground uppercase tracking-widest mb-2">Теги</h4>
            <div className="flex flex-wrap gap-2">
              {game.tags.map(t => (
                <span key={t} className="text-sm bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5 text-primary/80 font-rubik">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
