import { useFormik } from 'formik';
import { Button, Checkbox, Radio, Space } from 'antd';
import formStyles from '../../styles/modules/form.module.scss';

import { QuestionType, QuestionMode } from '../../types/exam-type';
import { useEffect } from 'react';

type QuestionPropsType = {
  question: QuestionType;
  onSubmit: (value: boolean[]) => void;
};

type FormStateType = {
  question: number | number[] | null | undefined;
};

const formInitialState: FormStateType = {
  question: null,
};

export default function Question(props: QuestionPropsType) {
  const { question, onSubmit } = props;

  const formik = useFormik({
    initialValues: formInitialState,
    onSubmit: (values) => {
      if (values.question !== null) {
        if (typeof values.question === 'number') {
          onSubmit([question.options[values.question].isCorrect]);
        } else if (Array.isArray(values.question)) {
          const valuesFormated = values.question.map((item) => {
            return question.options[item].isCorrect;
          });
          onSubmit(valuesFormated);
        }
      }
    },
  });

  const handleCheckboxChange = (value: number[]) => {
    formik.setFieldValue('question', value);
  };

  useEffect(() => {
    formik.resetForm();
  }, [question]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={formStyles.form}>
        <legend className={formStyles.legend}>{question.title}</legend>
        {question.questionMode === QuestionMode.Radio && (
          <Radio.Group
            name="question"
            onChange={formik.handleChange}
            value={formik.values.question}
          >
            <Space direction="vertical">
              {question.options.map((item, index) => (
                <Radio key={item.text} value={index}>
                  {item.text}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        )}

        {question.questionMode === QuestionMode.Checkbox && (
          <Checkbox.Group
            name="question"
            onChange={handleCheckboxChange}
            value={formik.values.question as number[] | undefined}
          >
            <Space direction="vertical">
              {question.options.map((item, index) => (
                <Checkbox key={item.text} value={index}>
                  {item.text}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        )}

        {/* TODO блокировка кнопки в ожидании ответа */}
        <Button htmlType="submit" className={formStyles.button}>
          Ответить
        </Button>
      </form>
    </div>
  );
}
