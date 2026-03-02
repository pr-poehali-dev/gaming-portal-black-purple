import { useState, useMemo, useEffect, useCallback } from 'react';
import { GENRES, GENRE_ICONS, Genre, Game } from '@/data/games';
import GameCard from '@/components/GameCard';
import GameModal from '@/components/GameModal';
import AddGameModal from '@/components/AddGameModal';
import Icon from '@/components/ui/icon';

const GAMES_API = 'https://functions.poehali.dev/da4e35c6-e266-424a-bfdd-40ab3f56dcad';

type SortOption = 'rating' | 'year' | 'votes' | 'title';

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState<Genre>('Все');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('rating');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(GAMES_API);
      const data = await res.json();
      setGames(data.games || []);
    } catch {
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGames(); }, [fetchGames]);

  const filtered = useMemo(() => {
    let list = games;
    if (activeGenre !== 'Все') list = list.filter(g => g.genre === activeGenre);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.description?.toLowerCase().includes(q) ||
        g.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'year') return b.year - a.year;
      if (sort === 'votes') return b.votes - a.votes;
      return a.title.localeCompare(b.title, 'ru');
    });
  }, [games, activeGenre, search, sort]);

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center animate-glow-pulse">
              <span className="text-lg">🎮</span>
            </div>
            <div>
              <h1 className="font-oswald font-bold text-xl gradient-text leading-none">GameVault</h1>
              <p className="text-muted-foreground text-xs font-rubik">Каталог игр</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск игр..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-rubik"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 cursor-pointer font-rubik"
            >
              <option value="rating">По рейтингу</option>
              <option value="year">По году</option>
              <option value="votes">По отзывам</option>
              <option value="title">По алфавиту</option>
            </select>

            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground font-oswald font-semibold px-4 py-2.5 rounded-xl text-sm transition-all hover:opacity-90 shadow-[0_0_15px_hsl(270_80%_60%/0.3)] hover:shadow-[0_0_25px_hsl(270_80%_60%/0.5)] whitespace-nowrap"
            >
              <Icon name="Plus" size={16} />
              Добавить игру
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="text-center mb-10">
          <p className="text-primary/70 font-oswald text-sm uppercase tracking-[4px] mb-3 font-medium">
            Лучший выбор игр
          </p>
          <h2 className="font-oswald font-bold text-5xl md:text-6xl gradient-text mb-4 leading-tight">
            Найди свою<br />следующую игру
          </h2>
          <p className="text-muted-foreground font-rubik text-base max-w-md mx-auto">
            {games.length} игр в {GENRES.length - 1} жанрах — от инди до AAA
          </p>
        </div>

        {/* Genre filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-rubik font-medium transition-all duration-200 border ${
                activeGenre === genre
                  ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(270_80%_60%/0.4)]'
                  : 'bg-secondary text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <span className="text-base leading-none">{GENRE_ICONS[genre]}</span>
              <span>{genre}</span>
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-rubik">
            <Icon name="Gamepad2" size={16} />
            <span>
              {filtered.length === games.length
                ? `Все ${filtered.length} игр`
                : `${filtered.length} из ${games.length} игр`}
            </span>
            {activeGenre !== 'Все' && (
              <span className="text-primary">· {activeGenre}</span>
            )}
          </div>
          {(search || activeGenre !== 'Все') && (
            <button
              onClick={() => { setSearch(''); setActiveGenre('Все'); }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-rubik"
            >
              <Icon name="X" size={12} />
              Сбросить фильтры
            </button>
          )}
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-secondary border border-border overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger">
            {filtered.map(game => (
              <GameCard key={game.id} game={game} onClick={setSelectedGame} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🕹️</div>
            <p className="font-oswald text-xl text-muted-foreground mb-2">Игры не найдены</p>
            <p className="text-muted-foreground/60 text-sm font-rubik">Попробуй другой запрос или жанр</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="font-oswald text-muted-foreground/50 text-sm">
            GameVault © 2026 · {games.length} игр · {GENRES.length - 1} жанров
          </p>
        </div>
      </section>

      {/* Modals */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
      {showAdd && (
        <AddGameModal onClose={() => setShowAdd(false)} onAdded={fetchGames} />
      )}
    </div>
  );
}
