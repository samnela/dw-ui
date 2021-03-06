import Form from './Form'

export default {
  component: Form,
  title: 'Form / Form'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwForm :submit="onSubmit" :form="form"><DwInputText v-model="form.name" name="name" label="My form" required /><DwButton type="submit" class="mt-5">Submit</DwButton></DwForm>',
  methods: {
    onSubmit () {
      this.$notification.success({
        title: 'Form',
        description: 'Form is valid 🎉'
      })
    }
  }
})

export const Default = Template.bind({})

Default.args = {
  form: {
    name: ''
  }
}
