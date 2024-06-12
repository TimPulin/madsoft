import { useFormik } from 'formik';
import { Button, Radio, Space } from 'antd';
import formStyles from '../../styles/modules/form.module.scss';

import type { QuestionType } from '../../types/exam-type';
import { useEffect } from 'react';

type QuestionPropsType = {
  question: QuestionType;
  onSubmit: (value: boolean) => void;
};

type FormStateType = {
  question: number | null;
};

const formInitialState: FormStateType = {
  question: null,
};

export default function Question(props: QuestionPropsType) {
  const { question, onSubmit } = props;

  const formik = useFormik({
    initialValues: formInitialState,
    onSubmit: (values) => {
      if (values.question !== null) onSubmit(question.options[values.question].isCorrect);
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [question]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={formStyles.form}>
        <legend className={formStyles.legend}>{question.title}</legend>
        <Radio.Group name="question" onChange={formik.handleChange} value={formik.values.question}>
          <Space direction="vertical">
            {question.options.map((item, index) => (
              <Radio key={item.text} value={index}>
                {item.text}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        {/* TODO блокировка кнопки в ожидании ответа */}
        <Button htmlType="submit" className={formStyles.button}>
          Ответить
        </Button>
      </form>
    </div>
  );
}
