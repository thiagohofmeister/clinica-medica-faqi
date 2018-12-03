import request from '@/api/request'

export default {
  /**
   * Retorna lista de pacientes.
   *
   * @returns {Promise<any>}
   */
  async getPacientes () {
    return (await request.get(process.env.API_URL + `/paciente`)).data
  },
  /**
   * Retorna lista de consultas de um paciente.
   *
   * @returns {Promise<any>}
   */
  async getPacienteConsultas (cpf) {
    return (await request.get(process.env.API_URL + `/consulta/${cpf}`)).data
  },
  /**
   * Retorna lista de medicos.
   *
   * @returns {Promise<any>}
   */
  async getMedicos () {
    return (await request.get(process.env.API_URL + `/medico`)).data
  },
  /**
   * Retorna lista de consultas de um médico.
   *
   * @returns {Promise<any>}
   */
  async getMedicoConsultas (crm) {
    return (await request.get(process.env.API_URL + `/consulta/medico/${crm}`)).data
  },
  /**
   * Retorna lista de atendentes.
   *
   * @returns {Promise<any>}
   */
  async getAtendentes () {
    return (await request.get(process.env.API_URL + `/atendente`)).data
  },
  /**
   * Valida se o horário está disponível para consulta.
   *
   * @returns {Promise<any>}
   */
  async getHorarioDisponivel (crm, date) {
    return (await request.get(process.env.API_URL + `/agendamedico/available/${crm}/${date}`)).data
  },
  /**
   * Marca uma consulta.
   *
   * @returns {Promise<any>}
   */
  async marcarConsulta (consulta) {
    return (await request.post(process.env.API_URL + `/consulta/schedule`, consulta)).data
  }
}
