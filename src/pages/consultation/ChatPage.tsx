import { PageHeader } from '@/components/layout/PageHeader';

export const ChatPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Tin nhắn tư vấn"
                subtitle="Trao đổi trực tiếp với bệnh nhân qua chat"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang này đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default ChatPage;
