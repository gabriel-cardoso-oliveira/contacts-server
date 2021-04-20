import * as Yup from 'yup';
import Contacts from '../models/Contacts';

class ContactsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      last_name: Yup.string().required(),
      fone: Yup.string().required(),
      birth_date: Yup.string().required(),
      address: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação' });
    }

    const contactExists = await Contacts.findOne({
      where: { email: req.body.email },
    });

    if (contactExists) {
      return res.status(400).json({
        error: 'Contato já existe. E-mail em uso!',
      });
    }

    const {
      id,
      name,
      last_name,
      fone,
      birth_date,
      address,
      email,
    } = await Contacts.create(req.body);

    return res.json({
      id,
      name,
      last_name,
      fone,
      birth_date,
      address,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      contactId: Yup.number(),
      name: Yup.string(),
      last_name: Yup.string(),
      fone: Yup.string(),
      birth_date: Yup.string(),
      address: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação' });
    }

    const { contactId, email } = req.body;

    const contact = await Contacts.findByPk(contactId || req.contactId);

    if (email !== contact.email) {
      const contactExists = await Contacts.findOne({ where: { email } });

      if (contactExists) {
        return res.status(400).json({
          error: 'Contato já existe. E-mail em uso!',
        });
      }
    }

    const {
      id,
      name,
      last_name,
      fone,
      birth_date,
      address,
    } = await contact.update(req.body);

    return res.json({
      id,
      name,
      last_name,
      fone,
      birth_date,
      address,
      email,
    });
  }

  async index(req, res) {
    const contacts = await Contacts.findAll();

    if (!contacts) {
      return res
        .status(401)
        .json({ error: 'Ocorreu um erro inesperado. Tente novamente!' });
    }

    return res.json(
      contacts.map((contact) => {
        const {
          id,
          name,
          last_name,
          fone,
          birth_date,
          address,
          email,
        } = contact;

        return {
          id,
          name,
          last_name,
          fone,
          birth_date,
          address,
          email,
        };
      })
    );
  }

  async show(req, res) {
    const contact = await Contacts.findOne({
      where: { id: req.params.id },
    });

    if (!contact) {
      return res.status(401).json({
        error: 'Ocorreu um erro ao encontrar o contato. Tente novamente!',
      });
    }

    const { name, last_name, fone, birth_date, address, email } = contact;

    return res.json({
      id: req.params.id,
      name,
      last_name,
      fone,
      birth_date,
      address,
      email,
    });
  }
}

export default new ContactsController();
