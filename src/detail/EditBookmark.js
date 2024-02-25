import EditBookmarkForm from "./EditBookmarkForm";
import { useState } from "react";

export default function EditBookmark({ bookmark, onEdit }) {
  const [editModalVisible, setEditModalVisible] = useState(false);

  return (
    <div>
      {editModalVisible && (
        <EditBookmarkForm
          bookmark={bookmark}
          onDismiss={() => setEditModalVisible(false)}
          onEdit={onEdit}
        />
      )}
      <button onClick={() => setEditModalVisible(true)}>Edit</button>
    </div>
  );
}
