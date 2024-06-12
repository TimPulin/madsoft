import { useFormik } from 'formik';
import { Button, Radio, Space } from 'antd';
import formStyles from '../../styles/modules/form.module.scss';

import type { QuestionType } from '../../types/exam-type';

type QuestionPropsType = {
  question: QuestionType;
};

const formInitialState = {
  question: null,
};

export default function Question(props: QuestionPropsType) {
  const { question } = props;

  const formik = useFormik({
    initialValues: formInitialState,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={formStyles.form}>
        <legend className={formStyles.legend}>{question.title}</legend>
        <Radio.Group name="question" onChange={formik.handleChange}>
          <Space direction="vertical">
            {question.options.map((item) => (
              <Radio key={item.text} value={item.isCorrect}>
                {item.text}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <Button htmlType="submit" className={formStyles.button}>
          Ответить
        </Button>
      </form>
    </div>
  );
}
