export default function PerformanceReviewDetailScreen() {
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(e.target);
  }
  return (
    <div>
      <h2>Performance Review for: USER</h2>
      <h4>By: USER_ME</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>1. Can get the job done well.</label>
          <select>
            <option>1. Bad</option>
            <option>2. Poor</option>
            <option>3. Fine</option>
            <option>4. Good</option>
            <option>5. Excelent</option>
          </select>
        </div>

        <div>
          <label>2. Team Work</label>
          <select>
            <option>1. Bad</option>
            <option>2. Poor</option>
            <option>3. Fine</option>
            <option>4. Good</option>
            <option>5. Excelent</option>
          </select>
        </div>

        <div>
          <label>3. Communication</label>
          <select>
            <option>1. Bad</option>
            <option>2. Poor</option>
            <option>3. Fine</option>
            <option>4. Good</option>
            <option>5. Excelent</option>
          </select>
        </div>

        <div>
          <label>4. Time Dicipline</label>
          <select>
            <option>1. Bad</option>
            <option>2. Poor</option>
            <option>3. Fine</option>
            <option>4. Good</option>
            <option>5. Excelent</option>
          </select>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
