import { defineStore } from 'pinia';

import { DataMeasurement } from '@/types';

import { getDataMeasurement } from '@/api';

export const dataMeasurementStore = defineStore('data-measurement', {
  state: () => ({
    // Entries data
    dataMeasurement: [] as DataMeasurement[],
  }),
  getters: {},
  actions: {
    fetchDataMeasurement() {
      getDataMeasurement().then(
        (data: DataMeasurement[]) => (this.dataMeasurement = data),
      );
    },
    setDataMeasurement(dataMeasurement: DataMeasurement[]) {
      this.dataMeasurement = dataMeasurement;
    },
  },
});
