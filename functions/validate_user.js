const Joi = require('joi');

module.exports = function validateUser(nickname) {
  return Joi.object({
    email: Joi.string().email().messages({
      'string.email': '이메일 양식을 지켜주세요',
    }),
    nickname: Joi.string().alphanum().min(3).max(12).required().messages({
      'string.alphanum': '알파벳 혹은 숫자만 사용해주세요',
      'string.min': '닉네임은 최소 3글자 이상입니다.',
      'string.max': '닉네임은 최대 12글자 이상입니다.',
    }),
    password: Joi.string()
      .custom((value, helpers) =>
        value.includes(nickname)
          ? helpers.message('비밀번호에 아이디를 포함할 수 없습니다.')
          : value
      )
      .min(4)
      .max(12)
      .required()
      .messages({
        'string.min': '비밀번호는 최소 4글자 이상입니다.',
        'string.max': '비밀번호는 최대 12글자 이상입니다.',
      }),
    confirmPassword: Joi.ref('password'),
  });
};
