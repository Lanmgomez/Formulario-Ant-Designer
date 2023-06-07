import React from 'react'
import './form.css'
import ReactInputMask from 'react-input-mask'
import { cpf } from 'cpf-cnpj-validator'
import { Form, Input } from 'antd'
import axios from 'axios'

const Address = ({ form }) => {

    const validateCPF = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('CPF é obrigatório'))
        }
        if (cpf.isValid(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('CPF inválido'))
        }
    }

    const onBlurCep = (e) => {
        const { value } = e.target

        const cep = value?.replace(/[^0-9]/g, '')

        if (cep?.length !== 8) {
            return;
        }
      
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => { 
                form.setFieldsValue({
                    address: response.data.logradouro,
                    addressneighborhood: response.data.bairro,
                    addresscomplement: response.data.complemento,
                    addresscity: response.data.localidade,
                    addressstate: response.data.uf,
                    addresszipcode: response.data.uf
                })
            })
    }

  return (
    <div>
        <Form.Item 
            name="document" 
            label="CPF"
            hasFeedback
            rules={[
                { required: true, validator: validateCPF  }
            ]}
        >
            <ReactInputMask
                id='ReactInputMask' 
                placeholder='Digite seu CPF...'
                mask="999.999.999-99"
            />
        </Form.Item>

        <Form.Item 
            name="addresszipcode" 
            label="Cep"
            className='cep-input'
            hasFeedback
            onBlur={(e) => onBlurCep(e)}
            rules={[
                { required: true, message: "CEP é obrigatório" },
            ]}
        >
            <Input placeholder='Digite seu cep...'/>
        </Form.Item>

        <Form.Item 
            name="address" 
            label="Rua"
            hasFeedback
            rules={[
                { required: true,  message:"Campo obrigatório" },
            ]}
        >
            <Input placeholder='Rua, logradouro, sítio...'/>
        </Form.Item>

        <Form.Item 
            name="addressneighborhood" 
            label="Bairro"
            hasFeedback
            rules={[
                { required: true,  message:"Campo obrigatório" },
            ]}
        >
            <Input placeholder='Por favor, digite seu bairro...' 
            />
        </Form.Item>

        <Form.Item 
            name="addresscomplement" 
            label="Complemento (opcional)"
        >
            <Input placeholder='Perto ao colegio tal, do ponto tal...'/>
        </Form.Item>

        <Form.Item 
            name="addresscity" 
            label="Cidade"
            hasFeedback
            rules={[
                { required: true,  message:"Campo obrigatório" },
            ]}
        >
            <Input className='city-input' placeholder='Digite sua cidade...'/>
        </Form.Item>

        <Form.Item 
            name="addressstate" 
            label="UF"
            hasFeedback
            rules={[
                { required: true, message:"Campo obrigatório" },
            ]}
        >
            <Input className='uf-input'/>
        </Form.Item>
        
    </div>
  )
}

export default Address