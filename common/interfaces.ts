export interface Message {
    bot_sender: number;
    business_id: number;
    id: number;
    message_date: string; 
    message_text: string;
    platform: string;
    received_number: number;
    reply_to_id: number | null;
    sender_name: string;
    sender_number: number;
}

export interface ClassifiedMessages {
    today: Message[];
    yesterday: Message[];
    thisWeek: Message[];
    thisMonth: Message[];
    earlier: Message[];
}