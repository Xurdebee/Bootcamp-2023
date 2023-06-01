const express = require('express');
const router = express.Router();
const sequelize = require('../conexion_bd.js');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;

    const response = await sequelize.query(
      'SELECT user_id, is_admin FROM users WHERE email=? AND password=?',
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: [email, password],
      }
    );

    if (response.length > 0) {
      const token = jwt.sign(
        { email: email, password: password },
        'secret_key'
      );
      console.log('Token:', token);
      res
        .json({
          user_id: response[0].user_id,
          token: token,
          is_admin: response[0].is_admin,
        })
        .end();
    } else {
      res
        .status(401)
        .json({ error: 'Correo electrónico o contraseña incorrectos' })
        .end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Registro
router.post('/newregister', async (req, res) => {
  const {
    alias,
    name,
    surname,
    email,
    password,
    birthday,
    country,
    city,
    linkedIn,
    education,
    extra_knowledge,
  } = req.body;

  try {
    // Verificar si el alias ya existe en la base de datos
    const aliasExists = await sequelize.query(
      'SELECT * FROM users WHERE alias = ?',
      {
        replacements: [alias],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (aliasExists.length > 0) {
      // Si ya existe un usuario con el mismo alias, enviar un mensaje de error
      res
        .status(400)
        .json({ message: 'Ya existe un usuario con el mismo alias.' });
      return;
    }

    // Verificar si el correo electrónico ya existe en la base de datos
    const emailExists = await sequelize.query(
      'SELECT * FROM users WHERE email = ?',
      {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (emailExists.length > 0) {
      // Si ya existe un usuario con el mismo correo electrónico, enviar un mensaje de error
      res.status(400).json({
        message: 'Ya existe un usuario con el mismo correo electrónico.',
      });
      return;
    }

    // Si el alias y correo electrónico no están en uso, crear un nuevo usuario en la base de datos
    await sequelize.query(
      `INSERT INTO users (alias, name, surname, email, password, birthday, country, city, linkedIn, education, extra_knowledge) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          alias,
          name,
          surname,
          email,
          password,
          birthday,
          country,
          city,
          linkedIn,
          education,
          extra_knowledge,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.json({ message: 'Usuario creado satisfactoriamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario.' });
  }
});

// Actualizar registro
router.put('/updateregister/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const {
    alias,
    name,
    surname,
    email,
    password,
    birthday,
    country,
    city,
    linkedIn,
    education,
    extra_knowledge,
  } = req.body;

  try {
    // Verificar si el alias ya existe en la base de datos, excluyendo el usuario actual
    const aliasExists = await sequelize.query(
      'SELECT * FROM users WHERE alias = ? AND user_id != ?',
      {
        replacements: [alias, user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Verificar si el correo electrónico ya existe en la base de datos, excluyendo el usuario actual
    const emailExists = await sequelize.query(
      'SELECT * FROM users WHERE email = ? AND user_id != ?',
      {
        replacements: [email, user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (aliasExists.length > 0 && emailExists.length > 0) {
      // Si ya existe un usuario con el mismo alias y correo electrónico, enviar un mensaje de error
      res.status(400).json({
        message: 'Ya existe un usuario con el mismo alias y correo electrónico.',
      });
    } else if (aliasExists.length > 0) {
      // Si ya existe un usuario con el mismo alias, enviar un mensaje de error
      res
        .status(400)
        .json({ message: 'Ya existe un usuario con el mismo alias.' });
    } else if (emailExists.length > 0) {
      // Si ya existe un usuario con el mismo correo electrónico, enviar un mensaje de error
      res.status(400).json({
        message: 'Ya existe un usuario con el mismo correo electrónico.',
      });
    } else {
      // Si el alias y correo electrónico no están en uso, actualizar el usuario en la base de datos
      const updateUser = await sequelize.query(
        `UPDATE users SET alias = ?, name = ?, surname = ?, email = ?, password = ?, 
		  birthday = ?, country = ?, city = ?, linkedIn = ?, education = ?, extra_knowledge = ? WHERE user_id = ?`,
        {
          replacements: [
            alias,
            name,
            surname,
            email,
            password,
            birthday,
            country,
            city,
            linkedIn,
            education,
            extra_knowledge,
            user_id,
          ],
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      res.json({ message: 'Usuario actualizado satisfactoriamente.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
});

module.exports = router;
