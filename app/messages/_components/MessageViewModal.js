"use client";
import { useState, useEffect } from "react";
import { FiX, FiCheckCircle, FiSend } from "react-icons/fi";
import { getMessageReplies } from "@/services/apiMessages";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function MessageViewModal({
  message,
  onClose,
  onMarkAsRead,
  isShowOkundu,
}) {
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const router = useRouter();

  // Format date
  const formattedDate = new Date(message.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Load previous replies
  useEffect(() => {
    const loadReplies = async () => {
      try {
        setIsLoadingReplies(true);
        const messageReplies = await getMessageReplies(message.id);
        setReplies(messageReplies);
      } catch (error) {
        console.error("Error loading replies:", error);
      } finally {
        setIsLoadingReplies(false);
      }
    };

    loadReplies();
  }, [message.id]);

  const handleSendReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Lütfen bir mesaj girin");
      return;
    }

    try {
      setIsSending(true);

      const replyData = {
        message_id: message.id,
        content: replyContent,
        created_by: "Admin", // You might want to use the actual user name here
      };

      await sendReply(replyData);

      // Refresh replies
      const updatedReplies = await getMessageReplies(message.id);
      setReplies(updatedReplies);

      // Clear reply input
      setReplyContent("");
      setIsReplying(false);

      toast.success("Yanıt başarıyla gönderildi");

      // Mark as read if not already
      if (!isShowOkundu) {
        onMarkAsRead();
      }
    } catch (error) {
      toast.error("Yanıt gönderilirken bir hata oluştu");
      console.error("Error sending reply:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleMarkAsReadAndClose = () => {
    onMarkAsRead();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mesaj Detayı</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Gönderen</p>
              <p className="font-medium">{message.sender}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-gray-500">Tarih</p>
              <p>{formattedDate}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Konu</p>
            <p className="font-medium text-lg">{message.subject}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Mesaj</p>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
              {message.content}
            </div>
          </div>

          {message.email && (
            <div className="space-y-1">
              <p className="text-sm text-gray-500">E-posta</p>
              <p className="text-blue-600">{message.email}</p>
            </div>
          )}

          {message.phone && (
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Telefon</p>
              <p>{message.phone}</p>
            </div>
          )}

          {/* Previous Replies */}
          {replies.length > 0 && (
            <div className="space-y-3 mt-6">
              <h3 className="font-medium text-gray-700">Önceki Yanıtlar</h3>
              {replies.map((reply) => (
                <div key={reply.id} className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {reply.created_by}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(reply.created_at).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{reply.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reply Form */}
          {isReplying ? (
            <div className="mt-6 space-y-3">
              <h3 className="font-medium text-gray-700">Yanıt Yaz</h3>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 min-h-[120px]"
                placeholder="Mesajınızı buraya yazın..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsReplying(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  disabled={isSending}
                >
                  İptal
                </button>
                <button
                  onClick={handleSendReply}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={isSending}
                >
                  {isSending ? (
                    "Gönderiliyor..."
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Gönder
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end gap-3 mt-6">
              {!isShowOkundu && (
                <button
                  onClick={handleMarkAsReadAndClose}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <FiCheckCircle className="mr-2" />
                  Okundu Olarak İşaretle
                </button>
              )}
              <button
                onClick={() => setIsReplying(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <FiSend className="mr-2" />
                Yanıt Yaz
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Kapat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
