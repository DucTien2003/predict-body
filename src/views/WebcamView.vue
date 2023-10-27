<template>
  <div>
    <Webcam :infoInputUser="formState"></Webcam>
    <a-modal
      v-model:open="open"
      title="Enter your height and weight"
      @cancel="handleCancel"
      :maskClosable="false"
      :width="600"
      :okButtonProps="{ hidden: true }"
      :cancelButtonProps="{ hidden: true }"
      :footer="null"
    >
      <a-form
        ref="formRef"
        id="info_form"
        name="info_form"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :model="formState"
      >
        <a-form-item
          name="name"
          :rules="[requiredRule('Name', 'blur', 'string', false, true)]"
        >
          <label for="info_form_name" class="font-medium inline-block my-1">
            Name <span class="text-red-500">*</span>
          </label>
          <a-input
            v-model:value="formState.name"
            placeholder="Enter your name"
          />
        </a-form-item>

        <a-form-item
          name="width"
          :rules="[
            requiredRule('Width', 'blur', 'string', false, true),
            requiredNumber('Height', 'blur'),
          ]"
        >
          <label for="info_form_width" class="font-medium inline-block my-1">
            Width <span class="text-red-500">*</span>
          </label>
          <a-input
            v-model:value="formState.width"
            placeholder="Enter your width"
          />
        </a-form-item>

        <a-form-item
          name="height"
          :rules="[
            requiredRule('Height', 'blur', 'string', false, true),
            requiredNumber('Height', 'blur'),
          ]"
        >
          <label for="info_form_height" class="font-medium inline-block my-1">
            Height <span class="text-red-500">*</span>
          </label>
          <a-input
            v-model:value="formState.height"
            placeholder="Enter your height"
          />
        </a-form-item>

        <a-form-item>
          <div class="flex items-center justify-end">
            <a-button type="primary" html-type="submit"> Confirm </a-button>

            <a-button class="ml-3" @click="handleCancel"> Cancel </a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

import Webcam from '@/components/webcam/Webcam.vue';
import { requiredNumber, requiredRule } from '@/utils';
import { InputInfoUser } from '@/types';

const router = useRouter();
const open = ref<boolean>(true);

const formState = reactive<InputInfoUser>({
  name: '',
  width: '',
  height: '',
});
const formRef = ref();

const resetModal = () => {
  formState.name = '';
  formState.width = '';
  formState.height = '';
  if (formRef.value) {
    (formRef.value as any).clearValidate();
  }
};

const handleCancel = () => {
  router.push({ name: 'home' });
  resetModal();
  console.log('Close Modal');
};

const onFinish = (values: any) => {
  // message.success('', 3);
  open.value = false;
  // console.log(formState);
  resetModal();
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  message.error('Info invalid', 3);
  console.log('Failed:', errorInfo);
};
</script>

<style lang=""></style>
