import React from 'react'
import { render, fireEvent, screen, getByText } from '@testing-library/react'
import Preview from './index'


describe('generic preview card', () => {

  it('should try to get it if given item is null', () => {
    const mockGetItem = jest.fn()
    render(<Preview
      item={null}
      itemId={13}
      itemType={"whatever"}
      getItem={mockGetItem}
      header={ <header>lololo</header> }
      leftToolbar={ <p className="content">lalala</p> }
      lookButton={null}
      user={null}
      steps={[]}
    />)

    expect(mockGetItem).toHaveBeenCalledTimes(1)
  })

  it('should not try to get it if given a not null item', () => {
    const mockGetItem = jest.fn()
    render(<Preview
      item={{ key: "value" }}
      itemId={13}
      itemType={"whatever"}
      getItem={mockGetItem}
      header={ <header>lololo</header> }
      leftToolbar={ <p className="content">lalala</p> }
      lookButton={null}
      user={null}
      steps={[]}
    />)

    expect(mockGetItem).toHaveBeenCalledTimes(0)
  })

  it('should display dropdown button in the toolbar', () => {
    const mockDropdownAction = jest.fn()
    const dropdownButtonIcon = <div>whatever html</div>
    const leftIcon = <div>whatever</div>
    const mockActionConstructor = jest.fn((item) => ([
      null,
      {
        leftIcon: leftIcon,
        name: "name",
        onClick: mockDropdownAction
      }
    ]))

    render(<Preview
      item={{ key: "value" }}
      itemId={13}
      itemType={"whatever"}
      getItem={null}
      header={ <header>lololo</header> }
      leftToolbar={ <p className="content">lalala</p> }
      lookButton={null}
      user={null}
      steps={[{
        step: "first step",
        icon: dropdownButtonIcon,
        actions: [
          {
            constructor: mockActionConstructor,
          }
        ]
      }]}
    />)

    fireEvent.click(screen.getByText("whatever html"))
    fireEvent.click(screen.getByText("whatever"))
    expect(mockDropdownAction).toHaveBeenCalledTimes(1)
  })
})
