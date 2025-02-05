import { ClassifiedMessages, Message } from '@/common/interfaces';
import { parseISO, isToday, isYesterday, isThisWeek, isThisMonth, format, compareAsc } from 'date-fns';

export function formatMessageDate(date: string) {
    const formattedTime = format(parseISO(date), "h:mm a")
    return formattedTime;
}

function sortMessagesByDate(messages: Message[]) {
    return messages.sort((a, b) => 
        compareAsc(parseISO(a.message_date), parseISO(b.message_date))
    );
}

export function classifyMessagesByDate(messages: Message[]): Partial<ClassifiedMessages> {
    const orderedMessages = sortMessagesByDate(messages);

    const categories: ClassifiedMessages = {
        earlier: [],
        thisMonth: [],
        thisWeek: [],
        yesterday: [],
        today: [],
    };

    orderedMessages.forEach((msg: Message) => {
        const messageDate = parseISO(msg.message_date);

        if (isToday(messageDate)) {
            categories.today.push(msg);
        } else if (isYesterday(messageDate)) {
            categories.yesterday.push(msg);
        } else if (isThisWeek(messageDate, { weekStartsOn: 0 })) {  
            categories.thisWeek.push(msg);
        } else if (isThisMonth(messageDate)) {
            categories.thisMonth.push(msg);
        } else {
            categories.earlier.push(msg);
        }
    });

    const populatedCategories = Object.fromEntries(
        Object.entries(categories).filter((category) =>  category[1].length > 0)
    );
    

    return populatedCategories;
}

type Categories = Record<string, Message[]>;

export function getMessageDate (categories: Categories, id: number | null): string {
    for (const category in categories) {
        const message = categories[category].find(msg => msg.id == id);
        if (message) {
            const parsedDate = parseISO(message.message_date);
            return format(parsedDate, 'MMMM d, yyyy'); 
        }
    }
    return ''; 
};

