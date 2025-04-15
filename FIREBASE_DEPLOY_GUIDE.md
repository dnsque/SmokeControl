# Руководство по деплою приложения на Firebase

## Предварительные шаги

1. **Установка Firebase CLI** (если еще не установлен):
   ```bash
   npm install -g firebase-tools
   ```

2. **Авторизация в Firebase**:
   ```bash
   firebase login
   ```

## Настройка проекта

1. **Инициализация Firebase в проекте**:
   ```bash
   firebase init
   ```
   
   Во время инициализации:
   - Выберите сервис **Hosting**
   - Выберите существующий проект Firebase или создайте новый
   - Укажите директорию для деплоя: `dist` (для Vite проектов)
   - На вопрос "Configure as a single-page app?" ответьте **Yes**
   - На вопрос "Set up automatic builds and deploys with GitHub?" можно ответить **No** (если не нужна интеграция с GitHub)

2. **Проверьте файл `firebase.json`** - он должен быть создан в корне проекта

## Сборка и деплой

1. **Соберите проект**:
   ```bash
   npm run build
   ```

2. **Деплой на Firebase**:
   ```bash
   firebase deploy
   ```

3. **После успешного деплоя** вы получите URL, где размещено ваше приложение

## Дополнительная настройка

### Автоматизация деплоя

Добавьте в `package.json` скрипт для быстрого деплоя:
```json
"scripts": {
  "deploy": "npm run build && firebase deploy"
}
```

Теперь можно деплоить командой:
```bash
npm run deploy
```

### Настройка собственного домена

1. Перейдите в [Firebase Console](https://console.firebase.google.com/)
2. Выберите ваш проект → Hosting → Connect domain
3. Следуйте инструкциям для подключения вашего домена

### Настройка переадресации и обработки ошибок

В файле `firebase.json` можно настроить переадресацию и обработку ошибок:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|jpg|jpeg|gif|png)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## Решение проблем

### Ошибка "Error: Failed to get Firebase project"
- Проверьте, что вы авторизованы: `firebase login`
- Проверьте наличие проекта: `firebase projects:list`

### Ошибка "Error: Deployment error"
- Проверьте права доступа к проекту Firebase
- Убедитесь, что директория `dist` создана и содержит файлы

### Проблемы с отображением SPA (одностраничного приложения)
- Проверьте настройки rewrites в firebase.json

## Полезные команды

- `firebase hosting:disable` - отключить хостинг
- `firebase hosting:channel:create CHANNEL_ID` - создать тестовый канал
- `firebase hosting:channel:deploy CHANNEL_ID` - деплой в тестовый канал
- `firebase hosting:channel:delete CHANNEL_ID` - удалить тестовый канал 