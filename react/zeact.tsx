import React from 'react';

declare namespace Zeact {
  const useState: <T>(initialValue: T) => [T, (value: T) => void];
  const useRef: <T>(initial: T | null) => {
    current: T | null;
  };
  const useEffect: (callback: Function, deps: unknown[]) => void;
  const useCallback: <T extends Function>(callback: T, deps: unknown[]) => T;
  interface FunctionComponent<P> {
    (props: P): JSX.Element;
  }

  interface FormEvent<T> {
    preventDefault(): void;
  }
  interface ChangeEvent<T> {
    currentTarget: T;
  }
  type ReactNode = React.ReactNode;
}

interface Props {
  children: Zeact.ReactNode;
  onSubmit: (e: Zeact.FormEvent<HTMLFormElement>) => void;
}
const Form: Zeact.FunctionComponent<Props> = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

const WordRelay = () => {
  const [word, setWord] = Zeact.useState('강민수');
  const [value, setValue] = Zeact.useState('');
  const [result, setResult] = Zeact.useState('');
  const inputEl = Zeact.useRef<HTMLInputElement>(null);

  Zeact.useEffect(() => {
    console.log('useEffect');
  }, []);

  const onSubmitForm = Zeact.useCallback(
    (e: Zeact.FormEvent<HTMLFormElement>) => {
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
  const onChange = Zeact.useCallback(
    (e: Zeact.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    []
  );
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
