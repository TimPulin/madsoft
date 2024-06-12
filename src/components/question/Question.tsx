import { Formik, useFormik } from 'formik';
import { Button, Checkbox, Radio, RadioChangeEvent, Space } from 'antd';
import formStyles from '../../styles/modules/form.module.scss';

import { QuestionType, QuestionMode } from '../../types/exam-type';

type QuestionPropsType = {
  question: QuestionType;
  onSubmit: (value: boolean[]) => void;
};

type FormStateType = {
  question: number[] | undefined;
};

const formInitialState: FormStateType = {
  question: [],
};

export default function Question(props: QuestionPropsType) {
  const { question, onSubmit } = props;

  const formik = useFormik({
    initialValues: formInitialState,
    onSubmit: (values) => {
      onSubmitLocal(values);
    },
  });

  function onSubmitLocal(values: FormStateType) {
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
    formik.resetForm();
  }

  const handleRadioChange = (event: RadioChangeEvent) => {
    const target = event.target;
    if (target !== null && target.name) formik.setFieldValue(target.name, target.value);
  };

  const handleCheckboxChange = (name: string, value: number[]) => {
    formik.setFieldValue(name, value);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={formStyles.form}>
        <legend className={formStyles.legend}>{question.title}</legend>
        {question.questionMode === QuestionMode.Radio && (
          <Radio.Group name="question" onChange={handleRadioChange} value={formik.values.question}>
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
            onChange={(event) => handleCheckboxChange('question', event)}
            value={formik.values.question}
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
        <Button disabled={!formik.dirty} htmlType="submit" className={formStyles.button}>
          Ответить
        </Button>
      </form>
    </div>
  );
}
