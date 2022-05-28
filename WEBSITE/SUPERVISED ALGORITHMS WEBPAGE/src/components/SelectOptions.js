export const SelectOptions = ({ yAttribute, setYAttribute, valueToLabel }) => {
    return (
        <div className="options">
            <label htmlFor="factor">SELECT FACTOR : </label>
            <select id="factor" value={yAttribute} onChange={(e) => { setYAttribute(e.target.value) }}>
                {
                    valueToLabel.map(({ value, label }) => <option key={value} value={value}>{label}</option>)
                }
            </select>
        </div>
    )
}