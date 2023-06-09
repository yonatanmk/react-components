import "./Multiselect.scss";
import Select, { StylesConfig } from 'react-select';
// import chroma from 'chroma-js';

type IMultiselectProps = {
  placeholder?: string;
  options: { label: string; value: string }[];
  onChange: (selected: any) => void;
};
function Multiselect({ options, onChange, placeholder }: IMultiselectProps) {
  // const selectStyles: StylesConfig<any, true> = {
  //   control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
  //   option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
  //     const color = chroma(data.color);
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled
  //         ? undefined
  //         : isSelected
  //         ? data.color
  //         : isFocused
  //         ? color.alpha(0.1).css()
  //         : undefined,
  //       color: isDisabled
  //         ? '#ccc'
  //         : isSelected
  //         ? chroma.contrast(color, 'white') > 2
  //           ? 'white'
  //           : 'black'
  //         : data.color,
  //       cursor: isDisabled ? 'not-allowed' : 'default',
  
  //       ':active': {
  //         ...styles[':active'],
  //         backgroundColor: !isDisabled
  //           ? isSelected
  //             ? data.color
  //             : color.alpha(0.3).css()
  //           : undefined,
  //       },
  //     };
  //   },
  //   multiValue: (styles: any, { data }: any) => {
  //     const color = chroma(data.color);
  //     return {
  //       ...styles,
  //       backgroundColor: color.alpha(0.1).css(),
  //     };
  //   },
  //   multiValueLabel: (styles: any, { data }: any) => ({
  //     ...styles,
  //     color: data.color,
  //   }),
  //   multiValueRemove: (styles: any, { data }: any) => ({
  //     ...styles,
  //     color: data.color,
  //     ':hover': {
  //       backgroundColor: data.color,
  //       color: 'white',
  //     },
  //   }),
  // };
  return (
    <Select 
      isMulti
      options={options}
      className="Multiselect"
      classNamePrefix="Multiselect"
      // styles={selectStyles}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Multiselect;
