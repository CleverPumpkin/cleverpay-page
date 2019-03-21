import { sampleSize } from 'lodash-es'

const words = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim ipsum ac erat mattis, non porttitor lorem iaculis. Quisque imperdiet lectus arcu. Nullam venenatis ornare lacus vitae ultrices. Praesent aliquam risus felis, in hendrerit lacus sagittis non. Vestibulum tempor rutrum ipsum ac laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ipsum odio, mattis in urna nec, mollis condimentum nisi. Mauris in velit lobortis dolor sollicitudin pulvinar. Integer convallis sed mi iaculis ultrices. Nulla interdum luctus arcu, vitae tempus magna imperdiet ut. In hac habitasse platea dictumst. Aliquam pulvinar dui eu nisi blandit tincidunt nec et velit. Morbi eu viverra turpis, vitae sodales est. Curabitur commodo sapien ipsum, at placerat mi malesuada vitae. Curabitur ultricies, est ut suscipit vehicula, ante justo cursus tellus, vitae luctus odio odio sed nulla. Donec vel placerat nisl, eget pellentesque leo'.split(
  /, | |\. /
)

export function generateWords(count: number): string {
  return sampleSize(words, count).join(' ')
}
