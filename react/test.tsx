import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useCallback,
  useRef,
  useState,
} from 'react';

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

const Form: FunctionComponent<Props> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

const WordRelay = () => {
  const [word, setWord] = useState('Hello');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm: FormEventHandler<HTMLFormElement> = useCallback(
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

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <Form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>Submit</button>
      </Form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
