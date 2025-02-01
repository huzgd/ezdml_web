<template>
  <CtDml/>
</template>

<script setup>
import CtDml from './dml/CtDml.vue'
import {registerTbCodeGenerator} from './dml/DmlGraph/DmlObjs'
import {dmlgen_Java} from './dml/DmlGenJs/Java.js'
import {dmlgen_Cpp} from './dml/DmlGenJs/Cpp.js'
import {dmlgen_CSharp} from './dml/DmlGenJs/CSharp.js'
//import {dmlgen_VueElementForm} from './dml/DmlGenJs/VueElementForm.js'

registerTbCodeGenerator('C++',dmlgen_Cpp);
registerTbCodeGenerator('C#',dmlgen_CSharp);
registerTbCodeGenerator('Java',dmlgen_Java);
//registerTbCodeGenerator('VueForm',dmlgen_VueElementForm);

</script>
