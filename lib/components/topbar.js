import {Box, Flex, Heading, Image, Stack} from '@chakra-ui/core'
import {
  faChevronRight,
  faQuestionCircle,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import React from 'react'
import {useSelector} from 'react-redux'

import Icon from 'lib/components/icon'
import selectRegion from 'lib/selectors/current-region'

const height = 42

export default function Topbar(p) {
  const region = useSelector(selectRegion)

  return (
    <Flex
      backgroundColor='gray.900'
      color='#fff'
      fontWeight={700}
      height={height + 'px'}
      justify='space-between'
    >
      <Flex align='center' height='100%'>
        <Image
          backgroundColor='#fff'
          borderRadius='100%'
          display='inline-block'
          mx='10px'
          size={height / 2 + 'px'}
          src='/logo.svg'
        />
        <Stack align='center' height='100%' isInline ml='10px' spacing={1}>
          <Box>
            <Link href='/'>
              <a>Regions</a>
            </Link>
          </Box>
          {region && (
            <>
              <Box opacity={0.5} mb='-4px'>
                <Icon icon={faChevronRight} />
              </Box>
              <Box>{region.name}</Box>
            </>
          )}
        </Stack>
      </Flex>
      <Stack align='center' height='100%' isInline pr='10px' spacing={2}>
        <Box>
          <a href='https://docs.analysis.conveyal.com'>
            <Box px='5px'>
              <Icon icon={faQuestionCircle} /> User Manual
            </Box>
          </a>
        </Box>
        <Box>
          <a href='https://docs.analysis.conveyal.com'>
            <Box px='5px'>
              <Icon icon={faSignOutAlt} /> Log out
            </Box>
          </a>
        </Box>
      </Stack>
    </Flex>
  )
}
