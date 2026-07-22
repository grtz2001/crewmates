// A row of clickable pills for a single-choice field. Click, don't type.
const OptionPills = ({ options, value, onChange }) => {
  return (
    <div className="pills">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={value === option ? 'pill on' : 'pill'}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default OptionPills
