const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className={`border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-amber-400 bg-transparent text-gray-700 py-2 px-0 ${
        props.className || ""
      }`}
    />
  );
};

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  props
) => {
  return (
    <textarea
      {...props}
      className={`border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-amber-200 bg-transparent text-gray-700 py-2 px-0 ${
        props.className || ""
      }`}
    />
  );
};

type SelectProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  options: { label: string; value: string; disabled?: boolean }[];
};

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  className,
  disabled,
}: SelectProps) => (
  <div className="flex flex-col">
    {label ? (
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 dark:text-amber-200 mb-2"
      >
        {label}
      </label>
    ) : null}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`rounded-lg p-1 border-gray-200 bg-white dark:bg-transparent dark:text-amber-300 shadow-sm hover:shadow-md border-0 transition-shadow ${
        className || ""
      }`}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const DatePicker: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <>
      <label
        htmlFor={props.name}
        className="block text-sm font-semibold text-gray-700 dark:text-amber-200 mb-2"
      >
        Due Date
      </label>
      <input
        type="datetime-local"
        className="block border-gray-300 bg-transparent text-amber-200 rounded-xl shadow focus:ring-blue-500 focus:border-blue-500 p-3"
        {...props}
      />
    </>
  );
};

export { Input, TextArea, Select, DatePicker };
