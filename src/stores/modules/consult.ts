import { ConsultType } from '@/enums'
import { ConsultIllness, PartialConsult } from '@/types/consult'
import { defineStore } from 'pinia'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    // 问诊信息
    const consult = ref<PartialConsult>({})
    // 记录问诊的类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 记录问诊级别
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 记录科室
    const setDep = (depId: string) => (consult.value.depId = depId)
    // 记录病情描述
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 记录患者
    const setPatient = (id: string) => (consult.value.depId = id)

    return { consult, setType, setIllnessType, setDep, setIllness, setPatient }
  },
  {
    // 仓库持久化到本地
    persist: true
  }
)
