import React, { useState } from "react";
import { FiTrash2, FiMail, FiClock } from "react-icons/fi";

function Home() {
  const [emails, setEmails] = useState([
    { id: 1, subject: "Welcome to Gmail", read: false },
    { id: 2, subject: "React Updates", read: true },
    { id: 3, subject: "Your Invoice", read: false },
  ]);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  const handleDelete = (emailId) => {
    const emailToDelete = emails.find((e) => e.id === emailId);
    setEmails((prev) => prev.filter((e) => e.id !== emailId));
    setPendingDelete(emailToDelete);

    const timeout = setTimeout(() => {
      setPendingDelete(null);
    }, 5000);
    setUndoTimeout(timeout);
  };

  const handleUndo = () => {
    if (pendingDelete) {
      setEmails((prev) => [pendingDelete, ...prev]);
      setPendingDelete(null);
      clearTimeout(undoTimeout);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <FiMail className="text-blue-500 text-2xl mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Inbox</h2>
      </div>

      <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {emails.map((email) => (
          <li
            key={email.id}
            className={`p-4 hover:bg-gray-50 ${
              !email.read ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div className={`flex-1 ${!email.read ? "font-semibold" : ""}`}>
                {email.subject}
              </div>
              <button
                onClick={() => handleDelete(email.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {pendingDelete && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-fade-in">
          <FiClock className="mr-2" />
          <span>Email deleted</span>
          <button
            onClick={handleUndo}
            className="ml-4 font-medium text-blue-300 hover:text-blue-100 transition-colors"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
