const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="border-b-2 border-gray-300 py-3 focus:outline-none focus:border-b-4 focus:border-amber-200 mb-0 "
      {...props}
    />
  );
};

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  return (
    <textarea
      className="border-b-2 border-gray-300 p-1 focus:outline-none focus:border-b-4 focus:border-amber-200"
      {...props}
    />
  );
};

type SelectProps = {
    label: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string; disabled?: boolean }[];
};

const Select = ({ label, name, value, onChange, options }: SelectProps) => (
    <div>
        <label
            htmlFor={name}
            className="block text-sm font-semibold text-gray-700 dark:text-amber-200 mb-2"
        >
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="block w-full border-gray-300 bg-transparent text-amber-200 rounded-xl shadow focus:ring-blue-500 focus:border-blue-500 p-3"
        >
            {options.map((opt, i) => (
                <option key={i} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

const DatePicker: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <input
            type="datetime-local"
            className="block border-gray-300 bg-transparent text-amber-200 rounded-xl shadow focus:ring-blue-500 focus:border-blue-500 p-3"
            {...props}
        />
    );
};

export { Input, TextArea, Select, DatePicker };
