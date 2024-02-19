export function TodoFilter({
  filterName,
  setFilterName,
  hideCompleted,
  setHideCompleted,
}) {
  return (
    <div className="filter-form flex items-center flex-nowrap gap-4 justify-between">
      <input
        type="text"
        id="name"
        className="input input-sm mt-2 input-bordered w-full hover:input-primary focus:input-primary"
        value={filterName}
        placeholder="Filter by task name..."
        onChange={(e) => setFilterName(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm text-nowrap">
        <input
          type="checkbox"
          className="checkbox"
          checked={hideCompleted}
          onChange={() => setHideCompleted(!hideCompleted)}
        />
        Hide Completed
      </label>
    </div>
  );
}
