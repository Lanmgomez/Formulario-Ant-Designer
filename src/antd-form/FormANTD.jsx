import { useState } from 'react'
import './form.css'
import { Form, Button, Input, Select, Radio, Checkbox, DatePicker, Space } from 'antd'
import Address from './Address'
import StrongPassword from './StrongPassword'
import axios from 'axios'
import moment from 'moment/moment'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const FormANTD = () => {

    const [genderValue, setGenderValue] = useState("")
    const [convertedBirthday, setConvertedBirthday] = useState('')

    const [form] = Form.useForm()

    const { TextArea } = Input

    const onChangeGender = (e) => {
      console.log('radio checked', e.target.value)
      setGenderValue(e.target.value)
    }

    const BirthDayConverted = (values) => {
        
        const convertedDate = moment(values)
        const convertedBirthday = convertedDate.format('YYYY-MM-DD 00:00:00')

        setConvertedBirthday(convertedBirthday)
    }

    const onFinish = (values) => {
        console.log(values)

        const cadastro = {
            name: values.name,
            email: values.email,
            gender: values.gender,
            birthday: convertedBirthday,
            zodiacSign: values.zodiacSign,
            description: values.description,
            document: values.document,
            addresszipcode: values.addresszipcode,
            address: values.address,
            addressneighborhood: values.addressneighborhood,
            addresscomplement: values.addresscomplement,
            addresscity: values.addresscity,
            addressstate: values.addressstate
        }

        axios.post("http://localhost:5000/informacoes", cadastro)
        .then((response) => { console.log(response)})
    }

  return (
    <div className='form-ant'>
        <Form
            className='form'
            form={form}
            onFinish={onFinish}
        >
           <h1>Formulário com Ant Designer</h1>
            <Form.Item 
                    name="name" 
                    label="Nome"
                    hasFeedback
                    rules={[
                        { required: true, message:"Campo obrigatório" },
                        { whitespace: true, message: "Nome não pode estar vazio" },
                        { min: 3, message: "O campo deve ter no mínimo 3 caracteres" }
                    ]}
            >
                    <Input placeholder='Digite seu nome...'/>
            </Form.Item>

            <Form.Item 
                    name="lastname" 
                    label="Sobrenome"
                    hasFeedback
                    rules={[
                        { required: true, message:"Campo obrigatório" },
                        { whitespace: true, message: "Sobrenome não pode estar vazio" },
                        { min: 3, message: "O campo deve ter no mínimo 3 caracteres" }
                    ]}
            >
                    <Input placeholder='Digite seu nome...'/>
            </Form.Item>

            <Form.Item 
                    name="email" 
                    label="E-mail"
                    hasFeedback
                    rules={[
                        { type: "email" },
                        { required: true, message:"Campo obrigatório" },
                        { whitespace: true, message: "Email não pode estar vazio" }
                    ]}
            >
                    <Input placeholder='Digite seu email...'/>
            </Form.Item>

            <Form.Item 
                    name="confirmemail" 
                    label="Confirme seu e-mail"
                    hasFeedback
                    rules={[
                        { type: "email" },
                        { required: true, message:"Campo obrigatório" },
                        { whitespace: true, message: "Email não pode estar vazio" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("email") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("Os e-mails digitados não conferem")
                            }
                        })
                    ]}
            >
                    <Input placeholder='Digite seu email...'/>
            </Form.Item>

            <Form.Item
                name="gender" 
                label="Sexo"
                hasFeedback
                rules={[
                    { required: true, message:"Campo obrigatório" },
                    { whitespace: true, message: "Escolha uma opção" },
                ]}
            >
                <Radio.Group 
                    onChange={onChangeGender} 
                    value={genderValue}
                >
                    <Radio value="Masculino">Masculino</Radio>
                    <Radio value="Feminino">Feminino</Radio>
                    <Radio value="Transgênero">Transgênero</Radio>
                    <Radio value="Não Binário">Não Binário</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item 
                name="birthday" 
                label="Data de Nascimento"
                hasFeedback
                rules={[
                    { required: true, message:"Campo obrigatório" },
                ]}    
            >
                <Space direction="vertical" size={12}>
                    <DatePicker 
                        defaultValue={dayjs('01/01/2023', 'DD/MM/YYYY')} 
                        format="DD/MM/YYYY" 
                        onChange={(values) => BirthDayConverted(values)}
                    />
                </Space>
            </Form.Item>

            <Form.Item
                name="zodiacSign"
                label="Signo"
                hasFeedback
                rules={[
                    { required: true, message:"Campo obrigatório" },
                    { whitespace: true, message: "Escolha uma opção" },
                ]}
            >
                <Select
                    name="zodiacSign"
                    placeholder="Escolha uma opção"
                >
                    <Select.Option id="Aquário" value="Aquário">Aquário</Select.Option>
                    <Select.Option id="Peixes" value="Peixes">Peixes</Select.Option>
                    <Select.Option id="Áries" value="Áries">Áries</Select.Option>
                    <Select.Option id="Touro" value="Touro">Touro</Select.Option>
                    <Select.Option id="Gêmeos" value="Gêmeos">Gêmeos</Select.Option>
                    <Select.Option id="Câncer" value="Câncer">Câncer</Select.Option>
                    <Select.Option id="Leão" value="Leão">Leão</Select.Option>
                    <Select.Option id="Virgem" value="Virgem">Virgem</Select.Option>
                    <Select.Option id="Libra" value="Libra">Libra</Select.Option>
                    <Select.Option id="Escorpião" value="Escorpião">Escorpião</Select.Option>
                    <Select.Option id="Sagitário" value="Sagitário">Sagitário</Select.Option>
                    <Select.Option id="Capricórnio" value="Capricórnio">Capricórnio</Select.Option>
                </Select>

            </Form.Item>

            <Form.Item
                name="description"
                label="Descrição"
            >
                <TextArea rows={4}>
                </TextArea>
            </Form.Item>

            <Address form={form} />

            <StrongPassword />

            <Form.Item 
                name="agreement" 
                wrapperCol={{ span: 24 }}
                valuePropName="checked"
                rules={[
                    { required: true, message:"Campo obrigatório" }
                ]}
                >
                <Checkbox>Concordo com nossos <a href='#'>termos e condições.</a></Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                    htmlType='submit'
                    type='primary'
                    block
                >
                    Cadastrar
                </Button>
        </Form.Item>
        </Form>
    </div>
  )
}

export default FormANTD