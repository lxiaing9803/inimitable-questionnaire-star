import { Input } from 'antd';
import { useCallback, useState } from 'react';

const { Search } = Input;

const SearchInput = () => {
  const [value, setValue] = useState<string>('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onSearch = useCallback((value: string) => {
    console.log(value);
  }, []);

  return (
    <Search
      placeholder="请输入关键字"
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  );
};

export default SearchInput;
