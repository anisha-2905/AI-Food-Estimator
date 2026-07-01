export interface MealRecord {
  id: string;
  foodName: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingSize: string;
  confidence: number;
  imageUrl: string;
  imageAlt: string;
  analyzedAt: string;
  description: string;
}

export const mockMealHistory: MealRecord[] = [
{
  id: 'meal-001',
  foodName: 'Grilled Chicken Caesar Salad',
  category: 'Salad',
  calories: 387,
  protein: 34.2,
  carbs: 18.5,
  fat: 19.8,
  fiber: 3.4,
  servingSize: '320g',
  confidence: 94.2,
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1132c93ea-1770308073161.png",
  imageAlt: 'Grilled chicken caesar salad with croutons and parmesan on white plate',
  analyzedAt: '2026-07-01T08:32:00Z',
  description: 'A classic Caesar salad topped with grilled chicken breast, romaine lettuce, croutons, and parmesan cheese with Caesar dressing.'
},
{
  id: 'meal-002',
  foodName: 'Avocado Toast with Poached Egg',
  category: 'Breakfast',
  calories: 412,
  protein: 18.7,
  carbs: 38.2,
  fat: 22.4,
  fiber: 7.8,
  servingSize: '280g',
  confidence: 91.7,
  imageUrl: "https://images.unsplash.com/photo-1507168510639-6eb49a603f34",
  imageAlt: 'Avocado toast with poached egg on sourdough bread with microgreens',
  analyzedAt: '2026-07-01T07:14:00Z',
  description: 'Sourdough toast topped with smashed avocado, a poached egg, red pepper flakes, and microgreens.'
},
{
  id: 'meal-003',
  foodName: 'Margherita Pizza (2 slices)',
  category: 'Pizza',
  calories: 564,
  protein: 21.3,
  carbs: 72.1,
  fat: 18.9,
  fiber: 3.1,
  servingSize: '220g',
  confidence: 97.1,
  imageUrl: "https://images.unsplash.com/photo-1677357903776-6a5c18c729e6",
  imageAlt: 'Margherita pizza with fresh mozzarella tomato and basil on wood board',
  analyzedAt: '2026-06-30T19:45:00Z',
  description: 'Classic Neapolitan-style pizza with San Marzano tomato sauce, fresh mozzarella, and basil leaves.'
},
{
  id: 'meal-004',
  foodName: 'Mango Smoothie Bowl',
  category: 'Smoothie Bowl',
  calories: 298,
  protein: 8.4,
  carbs: 58.3,
  fat: 4.7,
  fiber: 6.2,
  servingSize: '350g',
  confidence: 88.5,
  imageUrl: "https://images.unsplash.com/photo-1635341083002-67e6fa3c5f4b",
  imageAlt: 'Mango smoothie bowl topped with granola blueberries and coconut flakes',
  analyzedAt: '2026-06-30T08:20:00Z',
  description: 'Thick mango and banana base smoothie bowl topped with granola, blueberries, sliced kiwi, and coconut flakes.'
},
{
  id: 'meal-005',
  foodName: 'Beef Tacos (3 pieces)',
  category: 'Tacos',
  calories: 621,
  protein: 38.6,
  carbs: 52.4,
  fat: 27.3,
  fiber: 5.9,
  servingSize: '390g',
  confidence: 86.3,
  imageUrl: "https://images.unsplash.com/photo-1734773074866-507cc8d3b99c",
  imageAlt: 'Three beef street tacos with cilantro onion and lime on corn tortillas',
  analyzedAt: '2026-06-29T20:10:00Z',
  description: 'Street-style beef tacos on corn tortillas with seasoned ground beef, diced onion, cilantro, and salsa verde.'
},
{
  id: 'meal-006',
  foodName: 'Greek Yogurt Parfait',
  category: 'Snack',
  calories: 234,
  protein: 15.8,
  carbs: 31.2,
  fat: 4.1,
  fiber: 2.8,
  servingSize: '240g',
  confidence: 92.4,
  imageUrl: "https://images.unsplash.com/photo-1633893215265-4763142f9b57",
  imageAlt: 'Greek yogurt parfait with strawberry granola and honey in glass jar',
  analyzedAt: '2026-06-29T15:30:00Z',
  description: 'Layered Greek yogurt with strawberry jam, crunchy granola, mixed berries, and a drizzle of honey.'
},
{
  id: 'meal-007',
  foodName: 'Salmon Teriyaki Bowl',
  category: 'Bowl',
  calories: 543,
  protein: 42.1,
  carbs: 54.7,
  fat: 14.3,
  fiber: 4.5,
  servingSize: '420g',
  confidence: 89.8,
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_13b5205e8-1772113109079.png",
  imageAlt: 'Salmon teriyaki rice bowl with edamame cucumber and sesame seeds',
  analyzedAt: '2026-06-28T19:20:00Z',
  description: 'Pan-seared salmon fillet glazed with teriyaki sauce served over steamed rice with edamame, cucumber, and sesame seeds.'
},
{
  id: 'meal-008',
  foodName: 'Banana Oatmeal Pancakes',
  category: 'Breakfast',
  calories: 445,
  protein: 14.2,
  carbs: 68.9,
  fat: 12.7,
  fiber: 5.3,
  servingSize: '310g',
  confidence: 83.6,
  imageUrl: "https://images.unsplash.com/photo-1636972677998-d76f527e5576",
  imageAlt: 'Stack of banana oatmeal pancakes with maple syrup and fresh berries',
  analyzedAt: '2026-06-28T08:05:00Z',
  description: 'Fluffy oatmeal-based pancakes with ripe banana mashed in, served with maple syrup and fresh strawberries.'
},
{
  id: 'meal-009',
  foodName: 'Lentil Soup',
  category: 'Soup',
  calories: 286,
  protein: 17.4,
  carbs: 44.8,
  fat: 3.9,
  fiber: 11.2,
  servingSize: '380g',
  confidence: 79.4,
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ad7d461b-1772057101339.png",
  imageAlt: 'Red lentil soup with cumin drizzle of olive oil and crusty bread',
  analyzedAt: '2026-06-27T13:15:00Z',
  description: 'Hearty red lentil soup with cumin, coriander, and turmeric, finished with a drizzle of olive oil and lemon juice.'
},
{
  id: 'meal-010',
  foodName: 'Chocolate Lava Cake',
  category: 'Dessert',
  calories: 398,
  protein: 6.2,
  carbs: 52.1,
  fat: 19.8,
  fiber: 2.1,
  servingSize: '180g',
  confidence: 95.3,
  imageUrl: "https://images.unsplash.com/photo-1645544298640-f9ced878f948",
  imageAlt: 'Chocolate lava cake with molten center dusted with powdered sugar and vanilla ice cream',
  analyzedAt: '2026-06-27T20:40:00Z',
  description: 'Rich dark chocolate molten lava cake with a warm flowing center, served with vanilla bean ice cream and powdered sugar.'
},
{
  id: 'meal-011',
  foodName: 'Caprese Salad',
  category: 'Salad',
  calories: 267,
  protein: 14.8,
  carbs: 8.3,
  fat: 19.2,
  fiber: 1.7,
  servingSize: '260g',
  confidence: 90.1,
  imageUrl: "https://images.unsplash.com/photo-1725464781841-2d6f9ac10fb2",
  imageAlt: 'Caprese salad with fresh mozzarella tomatoes basil and balsamic glaze',
  analyzedAt: '2026-06-26T12:30:00Z',
  description: 'Fresh mozzarella and ripe tomato slices layered with basil leaves, drizzled with extra virgin olive oil and balsamic glaze.'
},
{
  id: 'meal-012',
  foodName: 'Veggie Stir Fry with Tofu',
  category: 'Stir Fry',
  calories: 342,
  protein: 19.6,
  carbs: 36.4,
  fat: 11.8,
  fiber: 8.3,
  servingSize: '360g',
  confidence: 84.7,
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b352495d-1772802801058.png",
  imageAlt: 'Colorful vegetable stir fry with tofu broccoli bell peppers in wok',
  analyzedAt: '2026-06-26T19:00:00Z',
  description: 'Crispy tofu stir-fried with broccoli, bell peppers, snap peas, and carrots in a savory ginger-soy sauce.'
}];


export const weeklyCalorieData = [
{ day: 'Mon', calories: 1820, goal: 2000 },
{ day: 'Tue', calories: 2140, goal: 2000 },
{ day: 'Wed', calories: 1650, goal: 2000 },
{ day: 'Thu', calories: 1980, goal: 2000 },
{ day: 'Fri', calories: 2310, goal: 2000 },
{ day: 'Sat', calories: 1540, goal: 2000 },
{ day: 'Sun', calories: 1085, goal: 2000 }];


export const categoryData = [
{ name: 'Breakfast', count: 18, color: '#f59e0b' },
{ name: 'Salad', count: 14, color: '#16a34a' },
{ name: 'Bowl', count: 11, color: '#0d9488' },
{ name: 'Pizza', count: 7, color: '#ef4444' },
{ name: 'Dessert', count: 5, color: '#7c3aed' },
{ name: 'Other', count: 9, color: '#94a3b8' }];


export const macroTrendData = [
{ day: 'Mon', protein: 82, carbs: 210, fat: 68 },
{ day: 'Tue', protein: 94, carbs: 248, fat: 79 },
{ day: 'Wed', protein: 71, carbs: 192, fat: 54 },
{ day: 'Thu', protein: 88, carbs: 224, fat: 72 },
{ day: 'Fri', protein: 103, carbs: 267, fat: 84 },
{ day: 'Sat', protein: 67, carbs: 178, fat: 51 },
{ day: 'Sun', protein: 49, carbs: 124, fat: 38 }];


export const foodClassificationResults = [
{
  id: 'food-001',
  name: 'Grilled Chicken Caesar Salad',
  confidence: 94.2,
  calories: 387,
  protein: 34.2,
  carbs: 18.5,
  fat: 19.8,
  fiber: 3.4,
  servingSize: '320g (approx. 1 plate)',
  category: 'Salad',
  description: 'A classic Caesar salad topped with grilled chicken breast, romaine lettuce, croutons, and parmesan cheese with Caesar dressing. Rich in lean protein and healthy fats.'
},
{
  id: 'food-002',
  name: 'Avocado Toast with Poached Egg',
  confidence: 91.7,
  calories: 412,
  protein: 18.7,
  carbs: 38.2,
  fat: 22.4,
  fiber: 7.8,
  servingSize: '280g (approx. 2 slices)',
  category: 'Breakfast',
  description: 'Sourdough toast topped with smashed avocado, a poached egg, red pepper flakes, and microgreens. Excellent source of healthy monounsaturated fats and complete protein.'
},
{
  id: 'food-003',
  name: 'Margherita Pizza',
  confidence: 97.1,
  calories: 564,
  protein: 21.3,
  carbs: 72.1,
  fat: 18.9,
  fiber: 3.1,
  servingSize: '220g (approx. 2 slices)',
  category: 'Pizza',
  description: 'Classic Neapolitan-style pizza with San Marzano tomato sauce, fresh mozzarella, and basil leaves. Higher in carbohydrates from the wheat crust.'
}];