import { useCallback, useRef, useState } from 'react';

const WordRelay = () => {
  const [word, setWord] = useState('Hello');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult('Correct');
        setWord(value);
        setValue('');
        if (input) {
          input.focus();
        }
      } else {
        setResult('Wrong');
        setValue('');
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const onChange = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>Submit</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
