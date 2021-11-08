import starIcon from './star.svg'
import { markRaw } from 'vue'

export default {
  name: 'Test Plugin',
  topbarIcon: markRaw(starIcon)
}
