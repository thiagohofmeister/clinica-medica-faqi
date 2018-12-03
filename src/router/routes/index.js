import Route from './Route'
import Layout from '@/components/template/Layout'

// Pacientes
import PacientesList from '@/views/Pacientes/List'
import PacienteConsultas from '@/views/Pacientes/Consultas'
import MarcarConsulta from '@/views/Pacientes/MarcarConsulta'

// Medicos
import MedicosList from '@/views/Medicos/List'
import MedicoConsultas from '@/views/Medicos/Consultas'

import AccessError from '@/views/AccessError'
import NotFound from '@/views/NotFound'

/**
 * Rotas da aplicação.
 *
 * @type {Route[]}
 */
const routes = [
  new Route(Layout, '/').setChildren([
    new Route(PacientesList, ''),
    new Route(PacienteConsultas, '/paciente/consultas/:cpf'),
    new Route(MarcarConsulta, '/paciente/marcar/:cpf'),
    new Route(MedicosList, '/medicos'),
    new Route(MedicoConsultas, '/medico/consultas/:crm')
  ]),
  new Route(AccessError, '/accessError'),
  new Route(NotFound, '/notFound'),
  {path: '*', redirect: '/notFound'}
]

export default routes
