import { useFormik } from 'formik';
import { Button, Radio, Space } from 'antd';
import formStyles from '../../styles/modules/form.module.scss';

const formInitialState = {
  question: null,
};

export default function Question() {
  const formik = useFormik({
    initialValues: formInitialState,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={formStyles.form}>
        <legend className={formStyles.legend}>Вопрос</legend>
        <Radio.Group name="question" onChange={formik.handleChange}>
          <Space direction="vertical">
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
          </Space>
        </Radio.Group>
        <Button htmlType="submit" className={formStyles.button}>
          Ответить
        </Button>
      </form>
    </div>
  );
}
