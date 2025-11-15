import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Plant = {
  id: number;
  name: string;
  latinName: string;
  image: string;
  watering: 'low' | 'medium' | 'high';
  size: 'small' | 'medium' | 'large';
  light: 'low' | 'medium' | 'bright';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  detailedInfo: {
    care: string;
    features: string[];
    temperature: string;
    humidity: string;
    toxicity: string;
  };
};

const mockPlants: Plant[] = [
  {
    id: 1,
    name: 'Монстера деликатесная',
    latinName: 'Monstera deliciosa',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'medium',
    size: 'large',
    light: 'medium',
    difficulty: 'easy',
    description: 'Популярное тропическое растение с крупными резными листьями',
    detailedInfo: {
      care: 'Полив 1-2 раза в неделю летом, зимой реже. Любит опрыскивание. Подкормка в период роста раз в 2 недели.',
      features: [
        'Воздушные корни помогают растению карабкаться',
        'Листья могут достигать 90 см в диаметре',
        'Отлично очищает воздух от формальдегида',
        'В природе может цвести и давать съедобные плоды'
      ],
      temperature: '18-25°C, не ниже 12°C зимой',
      humidity: 'Высокая 60-80%, переносит обычную квартирную',
      toxicity: 'Токсична для животных и детей при поедании'
    }
  },
  {
    id: 2,
    name: 'Сансевиерия трёхполосная',
    latinName: 'Sansevieria trifasciata',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'low',
    size: 'medium',
    light: 'low',
    difficulty: 'easy',
    description: 'Суккулентное растение, одно из самых выносливых комнатных растений',
    detailedInfo: {
      care: 'Полив раз в 2-3 недели. Зимой ещё реже — раз в месяц. Не требует опрыскивания и частых подкормок.',
      features: [
        'Выделяет кислород ночью, улучшает сон',
        'Может расти при искусственном освещении',
        'Переносит засуху до 1 месяца',
        'Народное название "тёщин язык" или "щучий хвост"'
      ],
      temperature: '16-28°C, выдерживает кратковременное понижение до 5°C',
      humidity: 'Низкая, отлично переносит сухой воздух квартир',
      toxicity: 'Слабо токсична при поедании в больших количествах'
    }
  },
  {
    id: 3,
    name: 'Фикус лировидный',
    latinName: 'Ficus lyrata',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'medium',
    size: 'large',
    light: 'bright',
    difficulty: 'medium',
    description: 'Элегантное дерево с крупными листьями в форме скрипки',
    detailedInfo: {
      care: 'Полив после просыхания верхнего слоя почвы. Не любит перестановок и сквозняков. Протирать листья от пыли.',
      features: [
        'Листья достигают 30-45 см в длину',
        'Может вырасти до потолка в квартире',
        'Капризен к изменению условий',
        'Популярен в современном интерьерном дизайне'
      ],
      temperature: '18-25°C, не переносит резких перепадов',
      humidity: 'Средняя 50-60%, желательно опрыскивание',
      toxicity: 'Млечный сок может вызвать раздражение кожи'
    }
  },
  {
    id: 4,
    name: 'Эпипремнум золотистый',
    latinName: 'Epipremnum aureum',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'medium',
    size: 'small',
    light: 'medium',
    difficulty: 'easy',
    description: 'Быстрорастущая лиана с пестрыми сердцевидными листьями',
    detailedInfo: {
      care: 'Полив при подсыхании почвы. Хорошо растёт на опоре или как ампельное. Легко размножается черенками.',
      features: [
        'Может расти в воде неограниченно долго',
        'Побеги достигают 2-3 метров длины',
        'Пестролистность ярче при хорошем освещении',
        'Входит в топ-10 лучших очистителей воздуха NASA'
      ],
      temperature: '17-27°C, минимум 12°C',
      humidity: 'Средняя, опрыскивание не обязательно',
      toxicity: 'Токсичен для животных, вызывает раздражение ЖКТ'
    }
  },
  {
    id: 5,
    name: 'Замиокулькас замиелистный',
    latinName: 'Zamioculcas zamiifolia',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'low',
    size: 'medium',
    light: 'low',
    difficulty: 'easy',
    description: 'Суккулентное растение с глянцевыми мясистыми листьями',
    detailedInfo: {
      care: 'Полив редкий, только после полного просыхания почвы. Избыток влаги губителен. Минимум внимания.',
      features: [
        'Запасает воду в клубнеобразном корневище',
        'Растёт медленно, но стабильно',
        'Народное название "долларовое дерево"',
        'Может сбросить листья при стрессе, но восстановится'
      ],
      temperature: '18-26°C, выдерживает кратковременно 12°C',
      humidity: 'Низкая, сухой воздух переносит отлично',
      toxicity: 'Сок ядовит, работать лучше в перчатках'
    }
  },
  {
    id: 6,
    name: 'Калатея украшенная',
    latinName: 'Calathea ornata',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'high',
    size: 'small',
    light: 'medium',
    difficulty: 'hard',
    description: 'Растение с декоративными узорчатыми листьями, требовательное к уходу',
    detailedInfo: {
      care: 'Регулярный полив мягкой водой, опрыскивание 2 раза в день. Подкормка раз в 2 недели весной-летом.',
      features: [
        'Листья складываются на ночь с характерным шелестом',
        'Рисунок на листьях уникален у каждого вида',
        'Не переносит сквозняки и холод',
        'Требует высокую влажность воздуха 70-90%'
      ],
      temperature: '20-25°C, строго без перепадов',
      humidity: 'Очень высокая 70-90%, нужен увлажнитель',
      toxicity: 'Не токсична, безопасна для животных'
    }
  },
  {
    id: 7,
    name: 'Спатифиллум Уоллиса',
    latinName: 'Spathiphyllum wallisii',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'high',
    size: 'small',
    light: 'medium',
    difficulty: 'easy',
    description: 'Популярное цветущее растение с белыми "парусами"',
    detailedInfo: {
      care: 'Обильный полив летом, умеренный зимой. Любит опрыскивание. Цветёт при правильном уходе круглый год.',
      features: [
        'Белые цветы-покрывала появляются регулярно',
        'Сигнализирует о жажде поникшими листьями',
        'Народное название "женское счастье"',
        'Отлично увлажняет и очищает воздух'
      ],
      temperature: '18-25°C, минимум 16°C',
      humidity: 'Высокая 50-70%, опрыскивание обязательно',
      toxicity: 'Токсичен при поедании, держать от животных'
    }
  },
  {
    id: 8,
    name: 'Хлорофитум хохлатый',
    latinName: 'Chlorophytum comosum',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'medium',
    size: 'small',
    light: 'medium',
    difficulty: 'easy',
    description: 'Неприхотливое ампельное растение с полосатыми листьями',
    detailedInfo: {
      care: 'Регулярный полив без застоя воды. Легко размножается детками. Нетребователен к условиям.',
      features: [
        'Образует дочерние розетки на длинных побегах',
        'Один из лучших очистителей воздуха',
        'Переносит широкий диапазон условий',
        'Идеален для начинающих цветоводов'
      ],
      temperature: '15-25°C, выносит до 8°C',
      humidity: 'Любая, адаптируется к условиям',
      toxicity: 'Не токсичен, безопасен для животных'
    }
  },
  {
    id: 9,
    name: 'Драцена окаймлённая',
    latinName: 'Dracaena marginata',
    image: 'https://cdn.poehali.dev/projects/32f28d9d-88f2-4ce4-bc83-13bfe6912af8/files/140832b7-e8bf-4e3e-8291-05ef7ba570f5.jpg',
    watering: 'medium',
    size: 'large',
    light: 'medium',
    difficulty: 'easy',
    description: 'Пальмообразное растение с узкими красноватыми листьями',
    detailedInfo: {
      care: 'Полив умеренный после просыхания верхнего слоя. Протирать листья. Периодически обрезать для кустистости.',
      features: [
        'Может достигать 2-3 метров в высоту',
        'Формирует древовидный ствол',
        'Хорошо переносит обрезку и формирование',
        'Удаляет из воздуха бензол и формальдегид'
      ],
      temperature: '18-25°C, минимум 15°C',
      humidity: 'Средняя, опрыскивание желательно',
      toxicity: 'Токсична для кошек и собак'
    }
  }
];

const wateringLabels = {
  low: 'Редкий',
  medium: 'Умеренный',
  high: 'Частый'
};

const sizeLabels = {
  small: 'Компактный',
  medium: 'Средний',
  large: 'Крупный'
};

const lightLabels = {
  low: 'Тень',
  medium: 'Полутень',
  bright: 'Много света'
};

const difficultyLabels = {
  easy: 'Простой',
  medium: 'Средний',
  hard: 'Сложный'
};

const Index = () => {
  const [selectedWatering, setSelectedWatering] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedLight, setSelectedLight] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [aiResult, setAiResult] = useState<string>('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const filteredPlants = mockPlants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.latinName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWatering = selectedWatering === 'all' || plant.watering === selectedWatering;
    const matchesSize = selectedSize === 'all' || plant.size === selectedSize;
    const matchesLight = selectedLight === 'all' || plant.light === selectedLight;
    const matchesDifficulty = selectedDifficulty === 'all' || plant.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesWatering && matchesSize && matchesLight && matchesDifficulty;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setTimeout(() => {
        setAiResult('Монстера деликатесная (Monstera deliciosa)');
      }, 1500);
    }
  };

  const resetFilters = () => {
    setSelectedWatering('all');
    setSelectedSize('all');
    setSelectedLight('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Sprout" className="text-primary" size={24} />
            <h1 className="text-lg sm:text-2xl font-bold text-primary">ЗелёныйПомощник</h1>
          </div>
          <nav className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={() => setShowAI(!showAI)} 
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium hover:text-primary transition-colors"
            >
              <Icon name="Camera" size={18} />
              <span className="hidden sm:inline">AI-поиск</span>
            </button>
            <a href="#catalog" className="text-xs sm:text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-12 sm:py-20 px-4 bg-gradient-to-b from-accent to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-3 sm:space-y-4 animate-fade-in">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Найди своё идеальное растение
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Используй фильтры по уходу, размеру и освещению для подбора растения под твои условия
              </p>
            </div>

            <div className="mt-8 sm:mt-12 max-w-md mx-auto">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск по названию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 sm:h-12 text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {showAI && (
          <section className="py-8 sm:py-12 px-4 bg-accent/30 border-y animate-scale-in">
            <div className="container mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Icon name="Sparkles" className="text-primary" />
                    AI-распознавание растений
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Загрузи фото растения, и ИИ определит его название
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center gap-4">
                    <Label htmlFor="plant-photo" className="cursor-pointer w-full">
                      <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 sm:p-8 hover:border-primary/60 transition-colors text-center">
                        <Icon name="Upload" className="mx-auto mb-2 text-primary" size={32} />
                        <p className="text-sm text-muted-foreground">
                          {selectedImage ? selectedImage.name : 'Нажми для выбора фото'}
                        </p>
                      </div>
                      <Input
                        id="plant-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                    {aiResult && (
                      <div className="w-full p-4 bg-primary/10 rounded-lg border border-primary/20 animate-fade-in">
                        <p className="text-sm font-medium text-primary mb-1">Результат распознавания:</p>
                        <p className="text-base sm:text-lg font-semibold">{aiResult}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        <section id="catalog" className="py-8 sm:py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold">Фильтры поиска</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFilters}
                  className="self-start sm:self-auto"
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Сбросить
                </Button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="watering" className="text-sm">Полив</Label>
                  <Select value={selectedWatering} onValueChange={setSelectedWatering}>
                    <SelectTrigger id="watering" className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любой</SelectItem>
                      <SelectItem value="low">Редкий</SelectItem>
                      <SelectItem value="medium">Умеренный</SelectItem>
                      <SelectItem value="high">Частый</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size" className="text-sm">Размер</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger id="size" className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любой</SelectItem>
                      <SelectItem value="small">Компактный</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="large">Крупный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="light" className="text-sm">Освещение</Label>
                  <Select value={selectedLight} onValueChange={setSelectedLight}>
                    <SelectTrigger id="light" className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любое</SelectItem>
                      <SelectItem value="low">Тень</SelectItem>
                      <SelectItem value="medium">Полутень</SelectItem>
                      <SelectItem value="bright">Много света</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-sm">Сложность</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger id="difficulty" className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любая</SelectItem>
                      <SelectItem value="easy">Простой</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="hard">Сложный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Найдено растений: <span className="font-semibold text-foreground">{filteredPlants.length}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPlants.map((plant, index) => (
                <Card 
                  key={plant.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedPlant(plant)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">{plant.name}</CardTitle>
                    <CardDescription className="italic text-sm">{plant.latinName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">{plant.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Icon name="Droplet" size={12} />
                        {wateringLabels[plant.watering]}
                      </Badge>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Icon name="Maximize2" size={12} />
                        {sizeLabels[plant.size]}
                      </Badge>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Icon name="Sun" size={12} />
                        {lightLabels[plant.light]}
                      </Badge>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Icon name="TrendingUp" size={12} />
                        {difficultyLabels[plant.difficulty]}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      Подробнее
                      <Icon name="ChevronRight" size={16} className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPlants.length === 0 && (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Растения не найдены</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Попробуй изменить параметры фильтров</p>
                <Button onClick={resetFilters} variant="outline">
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Dialog open={!!selectedPlant} onOpenChange={() => setSelectedPlant(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPlant && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPlant.name}</DialogTitle>
                <DialogDescription className="italic text-base">{selectedPlant.latinName}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img 
                    src={selectedPlant.image} 
                    alt={selectedPlant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Icon name="Droplet" size={14} />
                    Полив: {wateringLabels[selectedPlant.watering]}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Icon name="Maximize2" size={14} />
                    Размер: {sizeLabels[selectedPlant.size]}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Icon name="Sun" size={14} />
                    Свет: {lightLabels[selectedPlant.light]}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Icon name="TrendingUp" size={14} />
                    Уход: {difficultyLabels[selectedPlant.difficulty]}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="Leaf" size={18} className="text-primary" />
                    Описание
                  </h4>
                  <p className="text-muted-foreground">{selectedPlant.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="Info" size={18} className="text-primary" />
                    Уход
                  </h4>
                  <p className="text-muted-foreground">{selectedPlant.detailedInfo.care}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="Sparkles" size={18} className="text-primary" />
                    Особенности
                  </h4>
                  <ul className="space-y-2">
                    {selectedPlant.detailedInfo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-accent/30 rounded-lg">
                    <h5 className="font-medium text-sm mb-1 flex items-center gap-1">
                      <Icon name="Thermometer" size={14} />
                      Температура
                    </h5>
                    <p className="text-sm text-muted-foreground">{selectedPlant.detailedInfo.temperature}</p>
                  </div>
                  <div className="p-3 bg-accent/30 rounded-lg">
                    <h5 className="font-medium text-sm mb-1 flex items-center gap-1">
                      <Icon name="Droplets" size={14} />
                      Влажность
                    </h5>
                    <p className="text-sm text-muted-foreground">{selectedPlant.detailedInfo.humidity}</p>
                  </div>
                  <div className="p-3 bg-accent/30 rounded-lg sm:col-span-2">
                    <h5 className="font-medium text-sm mb-1 flex items-center gap-1">
                      <Icon name="AlertTriangle" size={14} />
                      Токсичность
                    </h5>
                    <p className="text-sm text-muted-foreground">{selectedPlant.detailedInfo.toxicity}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Sprout" className="text-primary" size={24} />
                <h3 className="font-bold text-base sm:text-lg">ЗелёныйПомощник</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Помогаем найти идеальное растение для дома и офиса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Возможности</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                  AI-распознавание растений
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                  Умные фильтры подбора
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                  Детальная информация по уходу
                </li>
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Для кого</h4>
              <p className="text-sm text-muted-foreground">
                Подходит как для профессиональных ботаников, так и для любителей домашнего озеленения
              </p>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 border-t text-center text-xs sm:text-sm text-muted-foreground">
            <p>© 2024 ЗелёныйПомощник. Создано с любовью к растениям 🌱</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
