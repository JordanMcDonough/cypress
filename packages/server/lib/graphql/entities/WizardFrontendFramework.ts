import { nxs, NxsResult } from 'nexus-decorators'
import { BUNDLER, FrameworkDisplayNames, FrontendFramework, FrontendFrameworkEnum } from '../constants'
import { Wizard } from './Wizard'
import { WizardBundler } from './WizardBundler'

@nxs.objectType({
  description: 'A frontend framework that we can setup within the app',
})
export class WizardFrontendFramework {
  constructor (private wizard: Wizard, private framework: FrontendFramework) {}

  @nxs.field.nonNull.type(() => FrontendFrameworkEnum, {
    description: 'The name of the framework',
  })
  get id (): NxsResult<'WizardFrontendFramework', 'id'> {
    return this.framework
  }

  @nxs.field.nonNull.string({
    description: 'The name of the framework',
  })
  get name (): NxsResult<'WizardFrontendFramework', 'name'> {
    return FrameworkDisplayNames[this.framework]
  }

  @nxs.field.nonNull.list.nonNull.type(() => WizardBundler, {
    description: 'All of the supported bundlers for this framework',
  })
  get supportedBundlers (): NxsResult<'WizardFrontendFramework', 'supportedBundlers'> {
    if (!this.wizard.framework || this.wizard.framework.id === 'reactjs' || this.wizard.framework.id === 'vuejs') {
      return BUNDLER.map((bundler) => new WizardBundler(this.wizard, bundler))
    }

    return [new WizardBundler(this.wizard, 'webpack')]
  }

  @nxs.field.nonNull.boolean({
    description: 'Whether this is the selected framework in the wizard',
  })
  get isSelected (): NxsResult<'WizardFrontendFramework', 'isSelected'> {
    return this.wizard.framework?.id === this.framework
  }
}