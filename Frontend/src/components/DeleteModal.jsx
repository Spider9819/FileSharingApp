function DeleteModal({ onDelete, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <div className="bg-slate-900 p-8 rounded-2xl w-96">

        <h2 className="text-white text-2xl font-bold">
          Delete File?
        </h2>

        <p className="text-slate-400 mt-3">
          This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onCancel}
            className="flex-1 bg-slate-700 py-3 rounded-xl text-white"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 py-3 rounded-xl text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;