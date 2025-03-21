import type { Message } from "$lib/types/app";
import type { FormField } from "$lib/types/dom/form";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function computeAge(startDate: Date, endDate: Date = new Date()): string {
    const diffMs = endDate.getTime() - startDate.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60));
    const remainingSecondsAfterYears = totalSeconds % (365.25 * 24 * 60 * 60);
    const months = Math.floor(remainingSecondsAfterYears / (30.44 * 24 * 60 * 60));
    const remainingSecondsAfterMonths = remainingSecondsAfterYears % (30.44 * 24 * 60 * 60);
    const days = Math.floor(remainingSecondsAfterMonths / (24 * 60 * 60));
    const remainingSecondsAfterDays = remainingSecondsAfterMonths % (24 * 60 * 60);
    const hours = Math.floor(remainingSecondsAfterDays / (60 * 60));
    const remainingSecondsAfterHours = remainingSecondsAfterDays % (60 * 60);
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const seconds = remainingSecondsAfterHours % 60;
    return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

export function groupMessagesByConversation(messages: Message[], currentUserId: string): { [conversationPartnerId: string]: Message[] } {
    const grouped = messages.reduce((acc, message) => {
        // Determine the conversation partner
        const partnerId = message.senderId === currentUserId ? message.recipientId : message.senderId;
        
        if (!acc[partnerId]) {
            acc[partnerId] = [];
        }
        acc[partnerId].push(message);
        return acc;
    }, {} as { [conversationPartnerId: string]: Message[] });

    // Optionally sort messages by timestamp within each group
    for (const partnerId in grouped) {
        grouped[partnerId].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }

    return grouped;
}

export function createFormDataObject(fields: FormField[]): Record<string, string> {
    return fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
    }, {} as Record<string, string>);
}