# 🍄 RX-NOTIFICATIONS 🍄


## Features

- Notification queue
- Element customization
- Different container positions
- Notifications are maintained when hovering
- Clicking disappears
- Integration with Material Icons
- Different colors

## Installation

To use this package your application must have some dependencies: 

- React/Next

```sh
npm install rx-notifications
```

Insert this lines on public/index.html if you're using react, if it's Nextjs add this links into document file.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
<script src="https://cdn.tailwindcss.com"></script>
```

## Sample

```js
import { useNotifications } from "rx-notifications";

export default function App() {
    const {
        notificationCenter, addNotification
    } = useNotifications({
        position: 'bottom-right'
    });

    return <div className="h-screen w-screen bg-slate-900 text-white">
        <button onClick={() => addNotification({
            message: "Hello world", 
            icon: 'notifications'
        })} className="bg-slate-950 m-5 rounded px-5 py-2">
            Añadir notificación
        </button>

        { notificationCenter }
    </div>
}
```

## Container position

To customize container position change or add position on useNotifications hook, only available the options on this list.

- bottom-right
- top-right
- bottom-left
- top-left

```js
useNotifications({
    position: 'options'
});
```

## Customizing notifications

As you can see we bring to you one sample design to your interfaces but we want a full customizable system, well, you can add another option to useNotifications hook, "style" option accept a complete tailwind style to the notification design, for example: 

```js
useNotifications({
    position: 'top-left', 
    style: 'flex items-center gap-3 justify-between bg-red-500 text-green-200 px-5 py-2 rounded'
});
```

If you're  not using Tailwind and you want to use CSS you can, only call to .notification class, for example: 

```css
.notification {
    /* Style here */
}
```

## Notification params
- icon: Select one icon from https://fonts.google.com/icons
- color: Native CSS color (red, orange, blue, '#fff')
- message: Notification message