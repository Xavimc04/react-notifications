import { useState } from "react";

interface INotification {
    icon?: string,
    message: string,
    counter: number,
    color?: string,
    timeout: any,
}

export function useNotifications({ 
    position, style 
} : {
    position: string, 
    style?: string
}) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = ({ icon, message, color } : { icon?: string, message: string, color?: string }) => {
        if (!message) return;
      
        let existingNotificationIndex = -1;
      
        const updatedNotifications: any = notifications.map((notification: INotification, index) => {
            if (notification.message === message) {
                existingNotificationIndex = index;

                return {
                    ...notification,
                    counter: notification.counter + 1,
                };
            }

            return notification;
        });
      
        if (existingNotificationIndex !== -1) {
            clearTimeout(updatedNotifications[existingNotificationIndex].timeout);
        
            const timeout = setTimeout(() => {
                setNotifications((prevNotifications) =>
                prevNotifications.filter(
                    (notification: INotification) => notification.message !== message
                )
                );
            }, 5000);
        
            updatedNotifications[existingNotificationIndex].timeout = timeout;
        } else {
            const timeout = setTimeout(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.filter(
                        (notification: INotification) => notification.message !== message
                    )
                );
            }, 5000);
        
            updatedNotifications.push({
                icon,
                message,
                counter: 1,
                color,
                timeout,
            });
        }
      
        setNotifications(updatedNotifications);
    };

    const notificationCenter = <div className={
        `
            absolute my-7 mx-7 cursor-pointer gap-5 select-none flex flex-col
            ${
                position == 'top-left' ? 'top-0 left-0' : 
                position == 'top-right' ? 'top-0 right-0' : 
                position == 'bottom-left' ? 'bottom-0 left-0' : 
                position == 'bottom-right' ? 'bottom-0 right-0' : 
                'top-0 left-0'
            }
        `
    } style={{
        zIndex: 100
    }}>
        {
            notifications.map((notification: INotification, index) => {
                return <div key={ index } onMouseEnter={
                    () => {
                        clearTimeout(notification.timeout);
                    }
                } onMouseLeave={
                    () => {
                        const timeout = setTimeout(() => {
                            setNotifications((prevNotifications) =>
                                prevNotifications.filter(
                                    (n: INotification) => n.message !== notification.message
                                )
                            );
                        }, 5000);
                    
                        notification.timeout = timeout;
                        setNotifications([...notifications]); 
                    }
                } onClick={
                    () => {
                        clearTimeout(notification.timeout);

                        setNotifications((prevNotifications) =>
                            prevNotifications.filter(
                                (n: INotification) => n.message !== notification.message
                            )
                        );
                    }
                } className={ style ? style : 'flex items-center bg-slate-950 relative px-3 py-2 gap-3 rounded text-lg min-h-[60px] min-w-[200px] notification hover:animate-pulse' }>
                    {
                        notification.icon && <span className={ `material-symbols-outlined` } style={{
                            color: notification.color ? notification.color : ''
                        }}>
                            { notification.icon }
                        </span>
                    }

                    <p className="pr-7">
                        { notification.message }
                    </p>

                    <div className={ `absolute text-black ${ !notification.color && 'bg-red-500' } text-xs w-[25px] h-[25px] flex items-center justify-center rounded-full top-[-10px] right-[-10px]` } style={{
                        backgroundColor: notification.color ? notification.color : ''
                    }}>
                        {
                            notification.counter
                        }
                    </div>
                </div>
            })
        }
    </div>;

    return {
        notificationCenter, 
        addNotification
    }
}
