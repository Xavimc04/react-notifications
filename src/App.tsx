import { useNotifications } from "./hooks/useNotifications";

export default function App() {
    const {
        notificationCenter, addNotification
    } = useNotifications({
        position: 'bottom-right'
    });

    return <div className="h-screen w-screen bg-slate-900 text-white">
        <button onClick={() => addNotification({
            message: "Sample", 
            icon: 'public'
        })} className="bg-slate-950 m-5 rounded px-5 py-2">
            Sample
        </button>

        <button onClick={() => addNotification({
            message: "Hello dude", 
            icon: 'notifications'
        })} className="bg-slate-950 m-5 rounded px-5 py-2">
            Hello dude
        </button>

        { notificationCenter }
    </div>
}