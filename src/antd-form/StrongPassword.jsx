import { PasswordInput } from 'antd-password-input-strength'
import { useState } from 'react'
import { Form } from 'antd'

const StrongPassword = () => {

    const [strongLevel, setStrongLevel] = useState(0)

    const minLevel = 1

  return (
    <div>
        <Form.Item
            name="password"
            label="Senha"
            hasFeedback
            rules={[
                { required: true, message: "Campo obrigatório" },
                { validator: async () => {
                    return strongLevel >= minLevel ? Promise.resolve() : Promise.reject(errorMessage);
                  },
                    message: "Senha muito fraca" 
                }
            ]}
        >
            <PasswordInput 
                onLevelChange={setStrongLevel} 
                placeholder="Digite sua senha..."    
            />
        </Form.Item>

        <Form.Item 
            name="confirmPassword" 
            label="Confirmar Senha"
            hasFeedback
            dependencies={["password"]}
            rules={[
                { required: true, message: "Campo obrigatório" },
                { validator: async () => {
                    return strongLevel >= minLevel ? Promise.resolve() : Promise.reject(errorMessage);
                  },
                    message: "Senha muito fraca" 
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve()
                        }
                        return Promise.reject("As senhas digitadas não são iguais")
                    }
                })
            ]}
        >
            <PasswordInput 
                onLevelChange={setStrongLevel} 
                placeholder="Confirme sua senha..."     
            />
        </Form.Item>

    </div>
  )
}

export default StrongPassword