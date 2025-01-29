import React from 'react'

const MerchantShortcuts = () => {
    const shortcuts = [
        {
            title: 'Integration Keys',
            description: 'Nulla eget lacus imperdiet, tincidunt orci non, faucibus dolor. Class aptent taciti sociosqu ad litora torquent',
            illustration: '',
            link: ''
        },
        {
            title: 'Account activation & Go live',
            description: 'Morbi aliquam, dui vitae tempus ultricies, ligula leo venenatis lacus, quis pulvinar leo massa nec diam',
            illustration: '',
            link: ''
        },
        {
            title: 'Create an Invoice',
            description: 'Donec est urna, porta eu accumsan non, mattis ac lectus. Donec eu massa quis dolor ',
            illustration: '',
            link: ''
        },
        {
            title: 'Add Payment Items/Revenue Heads',
            description: 'Nunc erosroin tempus, metus vel convallis vulputate, sem massa vehicula massa',
            illustration: '',
            link: ''
        },
        {
            title: 'Create Payment Page',
            description: 'Nunc sit amet gravida lectus. Nam finibus ipsum eu nunc facilisis, aliquam tincidunt sem tincidunt.',
            illustration: '',
            link: ''
        },
        {
            title: 'Create Payment Page',
            description: 'Etiam sodales purus eu diam placerat, at suscipit metus mollis. Mauris sit amet imperdiet lectus.',
            illustration: '',
            link: ''
        },
        {
            title: 'Invite a Teammate',
            description: 'Nulla eget lacus imperdiet, tincidunt orci non, faucibus dolor. Class aptent taciti sociosqu ad litora torquent.',
            illustration: '',
            link: ''
        },
        {
            title: 'Contact Support',
            description: 'Pellentesque purus dui, lobortis ut tristique nec, pharetra et turpis. Donec ut augue at neque tempor semper. Cras fermentum,',
            illustration: '',
            link: ''
        },
    ]
    return (
        <div className='w-full'>
            {shortcuts.map((shortcut, shortcutIndex) => (
                <div className='p-[15px] mb-[5px] cursor-pointer hover:bg-gray-100 rounded-[8px] transition duration-200' key={shortcutIndex}>
                    <h3 className='text-sm text-sufpay-black mb-[5px]'>{shortcut.title}</h3>
                    <p className='text-xs text-gray-500'>{shortcut.description}</p>
                </div>
            ))}
        </div>
    )
}

export default MerchantShortcuts