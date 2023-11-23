<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <div class="table-responsive shadow-lg p-3 mb-5 rounded">
          <table class="table table-hover border">
            <thead>
              <tr>
                <th>NO</th>
                <th>GEJALA</th>
                <th>VALUE CF</th>
                <th style="width: 20%;">UBAH VALUE.CF</th>
                <th style="width: 10%;">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in gejalaList" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.cf }}</td>
                <td>
                  <input
                    type="number"
                    step="0.1"
                    min = 0
                    class="form-control form-control-sm"
                    :value="item.cf"
                    @input="updateValueCF(item, $event)"
                  />
                </td>
                <td>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input check"
                      v-model="item.checked"
                      :id="'checkbox-' + item.id"
                    />
                    <label class="custom-control-label" :for="'checkbox-' + item.id"></label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-md-4">
        <div class="table-responsive shadow-lg p-3 mb-5 rounded">
          <table class="table table-hover border hover" style="color: black;">
            <thead>
              <tr>
                <th style="background-color: #4E73DF; color: aliceblue;">Penyakit</th>
              </tr>
            </thead>
            <tbody>
    <tr
      v-for="penyakit in penyakitList"
      :key="penyakit.id"
      @click="fetchGejalaData(penyakit.id)"
      :class="{ 'selected': penyakit.id === selectedPenyakitId }"
      class="hover"
      style="cursor: pointer;"
    >
      <td :style="{ color: penyakit.id === selectedPenyakitId ? 'blue' : 'black' }">
        {{ penyakit.nama }}
      </td>
    </tr>
  </tbody>
          </table>
        </div>
        <div style="margin-top: -2rem;">
          <button
            type="button"
            class="btn btn-primary btn-outline-dark"
            style="color: white; box-shadow: 2px 2px black"
            @click="submitForm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.selected {
  background-color: #e0e0e0; /* Ganti dengan warna latar belakang yang Anda inginkan */
}
</style>

<script>
export default {
  data() {
    return {
      gejalaList: [],
      penyakitList: [],
      selectedPenyakitId: null,
    };
  },
  created() {
    this.fetchGejalaData();
    this.fetchPenyakitData();
  },
  methods: {
    async fetchGejalaData(penyakitId) {
      try {
        const apiEndpoint = `http://192.168.100.56:8000/api/rule/${penyakitId}`;
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        const gejalaValueCF = {};
        data.rule_data.forEach((rule) => {
          gejalaValueCF[rule.gejala_id] = rule.value_cf;
        });

        this.gejalaList = data.gejala.map((gejala) => {
          return {
            id: gejala.id,
            cf: gejalaValueCF[gejala.id] || 0,
            checked: this.isGejalaChecked(gejala.id, data.rule_data),
            nama: gejala.nama,
          };
        });

        this.selectedPenyakitId = penyakitId;
      } catch (error) {
        console.error('Error fetching gejala data:', error);
      }
    },
    handleGejalaChecked(item) {
        if (item.checked && !this.gejalaList.some(gejala => gejala.id === item.id)) {
            this.gejalaList.push({
                id: item.id,
                cf: 0, // Nilai default, bisa diubah oleh pengguna
                checked: true,
                nama: item.nama
            });
        }
    },
    async fetchPenyakitData() {
      try {
        const response = await fetch('http://192.168.100.56:8000/api/penyakit');
        const data = await response.json();
        this.penyakitList = data;
      } catch (error) {
        console.error('Error fetching penyakit data:', error);
      }
    },
    updateValueCF(item, event) {

  const index = this.gejalaList.findIndex((gejala) => gejala.id === item.id);


  this.gejalaList[index].cf = parseFloat(event.target.value);
},
    isGejalaChecked(gejalaId, ruleData) {
      return ruleData.some((rule) => rule.gejala_id === gejalaId);
    },
    async submitForm() {
        try {
            const updatedRules = this.gejalaList.filter(item => item.checked).map(item => ({
                gejala_id: item.id,
                value_cf: item.cf
            }));

        const apiEndpoint = `http://192.168.100.56:8000/api/rule/${this.selectedPenyakitId}/update`;
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rule_data: updatedRules,
          }),
        });

        if (!response.ok) {
          throw new Error('Gagal mengirimkan formulir');
        }

        const responseData = await response.json();
        console.log(responseData);

        
        alert('Formulir berhasil dikirimkan!');
      } catch (error) {
        console.error('Error mengirimkan formulir:', error);
        
        alert('Gagal mengirimkan formulir. Silakan coba lagi.');
      }
    },
  },
};
</script>
